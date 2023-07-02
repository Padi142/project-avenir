import { timestamp, varchar, integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { sql, type InferModel } from 'drizzle-orm';

export const codes = pgTable('codes', {
	id: serial('id').primaryKey(),
	name: varchar('name').notNull(),
	hash: varchar('hash').notNull(),
	points: integer('points').notNull().default(1),
	createdAt: timestamp('created_at')
		.notNull()
		.default(sql`now()`),
	lastScanned: timestamp('last_scanned')
		.notNull()
		.default(sql`now()`)
});

export type Code = InferModel<typeof codes>;
