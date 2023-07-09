import { timestamp, varchar, integer, pgTable, serial, boolean } from 'drizzle-orm/pg-core';
import { sql, type InferModel } from 'drizzle-orm';
import { users } from './users';
import { codes } from './codes';

export const code_messages = pgTable('code_messages', {
	id: serial('id').primaryKey(),
	senderId: integer('sender-id')
		.notNull()
		.references(() => users.id),
	recieverId: integer('reciever_id')
		.references(() => users.id),
	sentOn: timestamp('sent_on')
		.notNull()
		.default(sql`now()`),
    recievedOn: timestamp('recieved_on'),
    wasViewed: boolean('was_viewed').notNull().default(false),
    message: varchar('message').notNull().default(""),
});

export type CodeMessages = InferModel<typeof code_messages>;