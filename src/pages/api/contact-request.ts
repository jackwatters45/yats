// /pages/api/contact-request.ts
import { ContactRequest, db } from "astro:db";
import type { ContactFormSchema } from "@/components/ContactForm";
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { useRateLimit } from "./utils/rate-limit";

export const prerender = false;

// send contact request received email
export const POST: APIRoute = async ({ request: req }) => {
	if (req.method && req.method !== "POST") {
		return new Response(
			JSON.stringify({
				message: "'Method not allowed, only POST requests are allowed'",
			}),
			{ status: 405 },
		);
	}

	const data = (await req.json()) as ContactFormSchema | undefined;
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

		// add to db
		await db.insert(ContactRequest).values({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone ?? null,
			companyName: data.companyName ?? null,
			message: data.message,
		});

		// send email to user
		const resend = new Resend(import.meta.env.RESEND_API_KEY);
		resend.emails.send({
			from: "Yats Support <support@yatusabes.co>",
			to: data.email,
			subject: "Request Received",
			html: getMessage({ name: `${data.firstName} ${data.lastName}` }),
		});

		// send email to support
		resend.emails.send({
			from: "Yats Support <support@yatusabes.co>",
			to: "support@yatusabes.co",
			subject: "New Contact Request",
			text: emailToSupport(data),
		});

		return new Response(JSON.stringify({ message: "Email sent successfully" }));
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ message: "Failed to send email", error: error }),
			{ status: 500 },
		);
	}
};

const getMessage = ({ name }: { name: string }) => `<!DOCTYPE html>
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
        <h1>We'll be in touch soon!</h1>
      </div>
      <div class="content">
        <p>Hello <span class="recipient-name">${name}</span>,</p>
        <p>
          Thank you for reaching out! We just wanted to let you know that we
          have received your request and we'll get back to you as soon as we
          can.
        </p>
      </div>
      <div class="signature">
        Thanks for your patience,<br />
        Yats Support
      </div>
      <div class="footer">
        <p>
          If you have any questions, feel free to <a
            href="mailto:support@yatusabes.co">contact us</a
          >.
        </p>
        <p>© 2024 Yats Co. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`;

const emailToSupport = (data: ContactFormSchema) =>
	`New Contact Request Received:\n
Time: ${new Date().toLocaleString()}\n
Name: ${data.firstName} ${data.lastName}\n
Email: ${data.email}\n
Phone: ${data.phone ?? "N/A"}\n
Company: ${data.companyName ?? "N/A"}\n
Message: ${data.message}`;
