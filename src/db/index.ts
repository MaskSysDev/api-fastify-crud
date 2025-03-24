import { env } from '#utils/env.js';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: env.DATABASE_URL,
  ssl: true,
});

export const db = drizzle(pool);
