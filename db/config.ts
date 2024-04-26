import { NOW, column, defineDb, defineTable } from 'astro:db';

const MailingListRecipient = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    email: column.text(),
    added_at: column.date({ default: NOW }),
    status: column.text({ default: 'active' }),
  },
  indexes: [{ on: 'email', unique: true }],
});

const ContactRequest = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    firstName: column.text(),
    lastName: column.text(),
    companyName: column.text({ optional: true }),
    email: column.text(),
    phone: column.text({ optional: true }),
    message: column.text(),
  },
});

export default defineDb({
  tables: {
    MailingListRecipient,
    ContactRequest,
  },
});
