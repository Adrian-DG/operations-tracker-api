import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './helpers/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG), AuthenticationModule],
})
export class AppModule {}
