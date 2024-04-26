import { ContactRequest, MailingListRecipient, db } from "astro:db";

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(MailingListRecipient).values([
		{
			name: "Jack Watters",
			email: "juanbrokenpancreas@gmail.com",
		},
		{
			name: "Aurelliano Buendía",
			email: "aurellianobuendía@macondo.com",
		},
		{
			name: "José Arcadio Buendía",
			email: "josearcadiobuendía@macondo.com",
		},
		{
			name: "Ursula Buendía",
			email: "ursulabuendía@macondo.com",
		},
		{
			name: "Amaranta Buendía",
			email: "amarantabuendía@macondo.com",
		},
	]);

	await db.insert(ContactRequest).values([
		{
			id: 1,
			firstName: "Jane",
			lastName: "Doe",
			companyName: "Doe Enterprises",
			email: "jane.doe@example.com",
			phone: "555-1234",
			message: "Interested in collaborating on a project.",
		},
		{
			id: 2,
			firstName: "John",
			lastName: "Smith",
			companyName: "Smith & Co.",
			email: "john.smith@example.com",
			phone: "555-5678",
			message: "Looking for a quote on your services.",
		},
		{
			id: 3,
			firstName: "Emily",
			lastName: "Johnson",
			companyName: "Johnson Digital",
			email: "emily.johnson@example.com",
			phone: "555-9012",
			message: "Requesting support for a recent purchase.",
		},
	]);
}
