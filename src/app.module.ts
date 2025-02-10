import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ENVIRONMENT_CONFIG } from './helpers/environment.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './helpers/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot(ENVIRONMENT_CONFIG),
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    AuthenticationModule,
  ],
})
export class AppModule {}
