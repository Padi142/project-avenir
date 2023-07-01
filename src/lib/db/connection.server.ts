import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import 'dotenv/config';

export const drizzle_db = drizzle(sql);

console.log('Migrating...');
await migrate(drizzle_db, { migrationsFolder: 'drizzle' });
