import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// const sqlServerProductionConfig: TypeOrmModuleOptions = {
//   type: 'mssql',
//   host: 'MOPC-SRV-ASISTENCIA\SQLEXPRES',
//   port: 1433,
//   username: 'operaciones',
//   password: 'op_estadistica@S3',
//   database: 'Operations_Tracker_DB',
//   options: { encrypt: false, trustServerCertificate: true },
// };

const sqlServerDevelopmentConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'addg',
  password: 'addg2396',
  database: 'Operations_Tracker_DB',
  options: { encrypt: false, trustServerCertificate: true },
};

// const sqlServerDevelopmentConfig: TypeOrmModuleOptions = {
//   type: 'mssql',
//   host: 'localhost',
//   port: 1433,
//   options: { trustServerCertificate: true },
//   database: 'Operations_Tracker_DB',
// };

// const sqliteConfig: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: '.db/operations.db',
// };

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  ...sqlServerDevelopmentConfig,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};
