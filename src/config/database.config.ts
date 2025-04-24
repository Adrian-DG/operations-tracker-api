import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

// const sqliteConfig: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: '.db/operations.db',
// };

dotenv.config({ path: '.env' });

const sqlServerProductionConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: `${process.env.DATABASE_PROD_HOST}`,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 1433,
  username: `${process.env.DATABASE_PROD_USERNAME}`,
  password: `${process.env.DATABASE_PROD_PASSWORD}`,
  authentication: {
    type: 'default',
    options: {
      userName: `${process.env.DATABASE_PROD_USERNAME}`,
      password: `${process.env.DATABASE_PROD_PASSWORD}`,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const sqlServerDeveloperConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: `${process.env.DATABASE_DEV_HOST}`,
  port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 1433,
  username: `${process.env.DATABASE_DEV_USERNAME}`,
  password: `${process.env.DATABASE_DEV_PASSWORD}`,
  authentication: {
    type: 'default',
    options: {
      userName: `${process.env.DATABASE_DEV_USERNAME}`,
      password: `${process.env.DATABASE_DEV_PASSWORD}`,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const DATABASE_CONFIG = {
  ...(process.env.NODE_ENV !== 'production'
    ? sqlServerDeveloperConfig
    : sqlServerProductionConfig),
  database: process.env.DATABASE_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV !== 'production',
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};

console.log('Database Config:', {
  ...DATABASE_CONFIG,
});

export default registerAs('DATABASE_CONFIG', () => DATABASE_CONFIG);
export const connectionSource = new DataSource(
  DATABASE_CONFIG as DataSourceOptions,
);

/// npx typeorm migration:create -n AddInitialMigration

/// npx typeorm migration:run
