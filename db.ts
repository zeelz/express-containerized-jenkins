// db.js
import { Pool } from 'pg';
import { config } from 'dotenv';
config()

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT as unknown as number
});