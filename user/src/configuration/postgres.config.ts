import { registerAs } from '@nestjs/config';

export const postgresConfig = registerAs('postgres', () => ({
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  schema: process.env.POSTGRES_SCHEMA,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}));
