import { NOW, column, defineDb, defineTable } from "astro:db";

const MailingListRecipient = defineTable({
	columns: {
		id: column.number({ primaryKey: true }),
		name: column.text(),
		email: column.text(),
		added_at: column.date({ default: NOW }),
		status: column.text(),
		confirmationToken: column.text({ optional: true }),
		confirmedAt: column.date({ optional: true }),
		unsubscribedAt: column.date({ optional: true }),
		optInSource: column.text(),
		lastEmailSentAt: column.date({ optional: true }),
		notes: column.text({ optional: true }),
	},
	indexes: [{ on: "email", unique: true }],
});

export default defineDb({
	tables: {
		MailingListRecipient,
	},
});
