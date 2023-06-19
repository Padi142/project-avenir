import { timestamp, varchar, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const User = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	level: integer('level').notNull().default(0),
	score: integer('score').notNull().default(0),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	lastLoggedIn: timestamp('last_logged_in')
		.notNull()
		.default(sql`now()`)
});
