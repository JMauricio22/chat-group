import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  postgres: {
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
  },
}));
