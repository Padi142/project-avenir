import type { Config } from 'drizzle-kit';
import 'dotenv/config'

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is missing');
}

export default {
  schema: './src/lib/db/schema/*',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL,
  },
} satisfies Config;