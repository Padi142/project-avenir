import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { drizzle_db } from './connection.server';

console.log('Migrating...');
await migrate(drizzle_db, { migrationsFolder: 'drizzle' });
