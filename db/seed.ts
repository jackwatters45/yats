import { MailingListRecipient, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(MailingListRecipient).values([
		{
			name: "Aurelliano Buendía",
			email: "aurellianobuendía@macondo.com",
			added_at: new Date(),
			status: "active",
			optInSource: "contactForm",
		},
	]);
}
