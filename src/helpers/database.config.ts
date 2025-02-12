import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const sqliteConfig: SqliteConnectionOptions = {
  type: 'sqlite',
  database: '.db/operations.db',
};

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  ...sqliteConfig,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};
