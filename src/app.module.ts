import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DATABASE_CONFIG } from './helpers/database.config';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { ActivitiesModule } from './modules/activities/activities.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DATABASE_CONFIG),
    AuthenticationModule,
    ActivitiesModule,
  ],
})
export class AppModule {}
