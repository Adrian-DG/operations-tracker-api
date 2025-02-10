import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DATABASE_CONFIG: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: '.db/operations.db', //process.env.DATABASE_NAME as string,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  autoLoadEntities: true,
  retryAttempts: 3,
  retryDelay: 3000,
  logger: 'debug',
  logging: true,
};
