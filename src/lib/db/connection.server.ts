import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import 'dotenv/config';

export const drizzle_db = drizzle(sql);


