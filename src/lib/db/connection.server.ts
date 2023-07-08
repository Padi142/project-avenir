import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import 'dotenv/config';
import { migrateDb } from './migration.server';

export const drizzle_db = drizzle(sql);
// await migrateDb()
