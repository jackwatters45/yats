import { MailingListRecipient, db, eq } from "astro:db";
import type { MailingFormSchema } from "@/components/forms/MailingFormngForm";
// /pages/api/mailing-list.ts
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { useRateLimit } from "./utils/rate-limit";

export const prerender = false;

type TempMailingListRecipientType = {
	status: "active" | "inactive";
	id: number;
};

// add to mailing list
export const POST: APIRoute = async ({ request: req }) => {
	if (req.method !== "POST") {
		return new Response(
			JSON.stringify({
				message: "'Method not allowed, only POST requests are allowed'",
			}),
			{ status: 405 },
		);
	}

	const data = (await req.json()) as MailingFormSchema | undefined;
	if (!data) {
		return new Response(
			JSON.stringify({ message: "Invalid form data submitted.." }),
			{
				status: 400,
			},
		);
	}

	try {
		await useRateLimit();

		const { name, email } = data;

		const existingSubscriber = (await db
			.select({
				status: MailingListRecipient.status,
				id: MailingListRecipient.id,
			})
			.from(MailingListRecipient)
			.where(
				eq(MailingListRecipient.email, email),
			)) as TempMailingListRecipientType[];

		const user = existingSubscriber?.[0];
		if (user && user.status === "active") {
			return new Response(
				JSON.stringify({ message: "Already subscribed to mailing list" }),
				{ status: 400 },
			);
		}

		if (user && user.status === "inactive") {
			await db
				.update(MailingListRecipient)
				.set({ status: "active" })
				.where(eq(MailingListRecipient.email, email));
		} else {
			await db.insert(MailingListRecipient).values({ name, email });
		}

		const resend = new Resend(import.meta.env.RESEND_API_KEY);
		resend.emails.send({
			from: "Yats Support <support@yatusabes.co>",
			to: email,
			subject: "Welcome to the Yats community!",
			html: getMessage({ name, email }),
		});

		return new Response(JSON.stringify({ message: "Email sent successfully" }));
	} catch (error) {
		return new Response(
			JSON.stringify({ message: "Failed to send email", error: error.message }),
			{ status: 500 },
		);
	}
};

// remove from mailing list
export const GET: APIRoute = async ({ request: req }) => {
	if (req.method !== "GET") {
		return new Response(
			JSON.stringify({
				message: "'Method not allowed, only GET requests are allowed'",
			}),
			{ status: 405 },
		);
	}

	const emailParam = new URL(req.url).searchParams.get("email");
	if (!emailParam) {
		return new Response(
			JSON.stringify({ message: "Invalid email search param" }),
			{
				status: 400,
			},
		);
	}

	try {
		await useRateLimit();

		await db
			.update(MailingListRecipient)
			.set({ status: "inactive" })
			.where(eq(MailingListRecipient.email, emailParam));

		return new Response(
			JSON.stringify({ message: "Unsubscribed successfully" }),
			{ status: 302 },
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to unsubscribe",
				error: error.message,
			}),
			{ status: 500 },
		);
	}
};

const getMessage = ({ name, email }: MailingFormSchema) => `<!DOCTYPE html>
<html>
<head>
<style>
body {
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-color: #0d2622;
  color: #f2f2f2;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.logo {
  display: block;
  margin: 0 auto 30px auto;
  width: 120px;
  height: auto;
}
.header {
  text-align: center;
  color: #def294;
  margin-bottom: 40px;
}
.header h1 {
  font-size: 24px;
  margin: 0;
  font-weight: bold;
}
.content {
  font-size: 16px;
  display: flex;
  flex-direction: column;
  line-height: 2;
}
.content p {
  font-size: 16px;
}
.signature {
  font-weight: bold;
  line-height: 2;
}
.footer {
  margin-top: 2rem;
  padding-top: 20px;
  border-top: 1px solid #b3b3b3;
  text-align: center;
  font-size: 12px;
  color: #888888;
}
</style>
</head>
<body>
<div class="container">
<img
  src="https://res.cloudinary.com/drheg5d7j/image/upload/v1713829143/YATS_favicon_diyjqu.webp"
  alt="Yats Logo"
  class="logo"
/>
<div class="header">
  <h1>Welcome to the Yats Community!</h1>
</div>
<div class="content">
  <p>Hello <span class="recipient-name">${name}</span>,</p>
  <p >Thank you for joining our mailing list! We're thrilled to have you onboard. You'll start receiving updates, news, and exclusive offers straight to your inbox.</p>
</div>
<div class="signature">
  Thanks for your patience,<br />
  Yats Support
</div>
<div class="footer">
<p class="unsubscribe">If you did not intend to join our mailing list or if you wish to opt-out, please <a href="http://yatusabes.co/unsubscribe?email=${email}">click here</a> to unsubscribe.</p>
  <p>
    If you have any questions, feel free to <a
      href="mailto:support@yatusabes.co">contact us</a
    >.
  </p>
  <p>© 2024 Yats Co. All rights reserved.</p>
</div>

</body>
</html>`;
