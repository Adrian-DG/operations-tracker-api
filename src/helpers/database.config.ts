import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

// const sqlServerProductionConfig: TypeOrmModuleOptions = {
//   type: 'mssql',
//   host: 'tcp:asistenciavialdbserver.database.windows.net',
//   authentication: {
//     type: 'default',
//     options: { userName: 'SqlAdmin', password: 'Mopc8044' },
//   },
//   username: 'SqlAdmin',
//   password: 'Mopc8044',
//   database: 'asistenciaVialDb',
//   options: { encrypt: true, trustServerCertificate: false },
// };

// const sqlServerDevelopmentConfig: TypeOrmModuleOptions = {
//   type: 'mssql',
//   host: 'localhost',
//   port: 1433,
//   options: { trustServerCertificate: true },
//   database: 'Operations_Tracker_DB',
// };

const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '.db/operations.db',
};

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  ...sqliteConfig,
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};
