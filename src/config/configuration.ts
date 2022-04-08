import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  postgres: {
    url: process.env.DATABASE_URL,
  },
}));
