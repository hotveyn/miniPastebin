import { registerAs } from '@nestjs/config';

export const httpConfig = registerAs('http', () => ({
  httpHost: process.env.HTTP_HOST,
  httpPort: process.env.HTTP_PORT,
}));
