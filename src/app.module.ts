import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ENVIRONMENT_CONFIG } from './helpers/environment.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './helpers/database.config';

@Module({
  imports: [
    ConfigModule.forRoot(ENVIRONMENT_CONFIG),
    TypeOrmModule.forRoot(DATABASE_CONFIG),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
