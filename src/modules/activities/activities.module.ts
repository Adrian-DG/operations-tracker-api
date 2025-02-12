import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { Activity } from './entities/activity.entity';
import { ActivityImage } from './entities/activity-image.entity';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, ActivityType, ActivityImage])],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivitiesModule {}
