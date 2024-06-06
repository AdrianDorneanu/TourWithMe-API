import dotenv from 'dotenv';
import sql, { Connection, ConnectionOptions } from 'mysql2';

dotenv.config();

export const db: Connection = sql.createConnection({
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
} as ConnectionOptions);
