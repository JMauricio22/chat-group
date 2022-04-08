const dotenv = require('dotenv');

dotenv.config();

let DATABASE_URL = process.env.DATABASE_URL;

let extraConfig;

if (process.env.NODE_ENV === 'development') {
  extraConfig = {};
} else {
  extraConfig = {
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
}

module.exports = {
  type: 'postgres',
  url: DATABASE_URL,
  synchronize: false,
  loggin: true,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migration',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  ...extraConfig,
};
