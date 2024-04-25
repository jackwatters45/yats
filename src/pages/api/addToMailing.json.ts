import type { APIRoute } from "astro";
// /pages/api/sendEmail.ts
import { Resend } from "resend";

export const prerender = false;

type Data = { name: string; email: string };

// TODO add db part
// TODO other route to send + unsubscribe
// TODO add rate limiting
// TODO set up env vars
export const POST: APIRoute = async ({ request: req }) => {
	if (req.method !== "POST") {
		return new Response(
			JSON.stringify({
				message: "'Method not allowed, only POST requests are allowed'",
			}),
			{ status: 405 },
		);
	}

	const { name, email } = (await req.json()) as Data;

	return new Response(JSON.stringify({ message: "Email sent successfully" }));

	// const resend = new Resend('re_DzV2jujx_3VFEfPWcygdFMGPFUMZaDv67'); // TODO use env

	// try {
	//   resend.emails.send({
	//     from: 'Yats Support <support@yatusabes.co>',
	//     to: email,
	//     subject: 'Welcome to the Yats community!',
	//     html: getMessage({ name, email }),
	//   });

	//   return new Response(JSON.stringify({ message: 'Email sent successfully' }));
	// } catch (error) {
	//   return new Response(
	//     JSON.stringify({ message: 'Failed to send email', error: error.message }),
	//     { status: 500 },
	//   );
	// }
};

const getMessage = ({ name, email }: Data) => `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
      color: #333;
    }
    .header {
      font-size: 24px;
    }
    .content {
      margin-top: 20px;
      font-size: 16px;
      line-height: 1.6;
    }
    .footer {
      margin-top: 40px;
      font-size: 12px;
      text-align: center;
      color: #888;
    }
    .unsubscribe {
      margin-top: 20px;
      font-size: 14px;
      color: #555;
    }
    a {
      color: #4A90E2;
    }
  </style>
</head>
<body>
  <p class="header">Welcome to the Yats Community!</p>
  <p class="content">Hello ${name},</p>
  <p class="content">Thank you for joining our mailing list! We're thrilled to have you onboard. You'll start receiving updates, news, and exclusive offers straight to your inbox.</p>
  <p class="unsubscribe">If you did not intend to join our mailing list or if you wish to opt-out, please <a href="http://yatusabes.co/unsubscribe?email=${email}">click here</a> to unsubscribe.</p>
  <p class="footer">© 2023 Yats Co. All rights reserved.</p>
</body>
</html>`;
