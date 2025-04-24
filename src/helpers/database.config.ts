import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const sqlServerProductionConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: '143.1.15.5',
  port: 1433,
  database: 'Operations_Tracker_DB',
  username: 'operaciones',
  password: 'op_estadistica@S3',
  authentication: {
    type: 'default',
    options: { userName: 'operaciones', password: 'op_estadistica@S3' },
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

// const sqliteConfig: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: '.db/operations.db',
// };

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  ...sqlServerProductionConfig,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};

/// npx typeorm migration:create -n AddInitialMigration

/// npx typeorm migration:run
