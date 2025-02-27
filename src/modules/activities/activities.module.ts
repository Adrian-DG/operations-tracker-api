import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { Activity } from './entities/activity.entity';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';
import { ActivityTypeService } from './services/activity-types.service';
import { ActivityImagesService } from './services/activity-document.service';
import { ActivityDocument } from './entities/activity-document.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, ActivityType, ActivityDocument]),
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ActivityTypeService, ActivityImagesService],
})
export class ActivitiesModule {}
