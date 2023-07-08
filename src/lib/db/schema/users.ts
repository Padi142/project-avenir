import { timestamp, varchar, integer, pgTable, serial, boolean } from 'drizzle-orm/pg-core';
import { sql, type InferModel } from 'drizzle-orm';

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	hash: varchar('hash').notNull(),
	level: integer('level').notNull().default(0),
	score: integer('score').notNull().default(0),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	lastLoggedIn: timestamp('last_logged_in')
		.notNull()
		.default(sql`now()`),
	isAdmin: boolean('isAdmin').default(false)
});
export type User = InferModel<typeof users>;
