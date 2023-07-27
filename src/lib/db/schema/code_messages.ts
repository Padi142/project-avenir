import { timestamp, varchar, integer, pgTable, serial, boolean } from 'drizzle-orm/pg-core';
import { sql, type InferModel } from 'drizzle-orm';
import { users } from './users';
import { codes } from './codes';

export const code_messages = pgTable('code_messages', {
	id: serial('id').primaryKey(),
	senderId: integer('sender_id')
		.notNull()
		.references(() => users.id),
	receiverId: integer('receiver_id').references(() => users.id),
	sentOn: timestamp('sent_on')
		.notNull()
		.default(sql`now()`),
	receivedOn: timestamp('received_on'),
	wasViewed: boolean('was_viewed').notNull().default(false),
	codeId: integer('code_id').references(() => codes.id),
	message: varchar('message').notNull().default(''),

});

export type CodeMessage = InferModel<typeof code_messages>;
