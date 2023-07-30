import { timestamp, varchar, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { sql, type InferModel } from 'drizzle-orm';
import { users } from './users';
import { codes } from './codes';
import { code_messages } from './code_messages';

export const scans = pgTable('scan_records', {
	id: serial('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id),
	codeId: integer('code_id')
		.notNull()
		.references(() => codes.id),
	scannedOn: timestamp('scanned_on')
		.notNull()
		.default(sql`now()`),
	receivedMessage: integer('received_message').references(() => code_messages.id),
	sentMessage: integer('sent_message').references(() => code_messages.id)
});

export type Scan = InferModel<typeof scans>;
