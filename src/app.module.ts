import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ActivitiesModule } from './modules/activities/activities.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const options =
          configService.get<TypeOrmModuleOptions>('DATABASE_CONFIG');
        if (!options) {
          throw new Error('TypeORM configuration is missing');
        }
        return options;
      },
    }),
    AuthenticationModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
