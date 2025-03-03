import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityType } from './entities/activity-type.entity';
import { Activity } from './entities/activity.entity';
import { ActivityController } from './controllers/activity.controller';
import { ActivityService } from './services/activity.service';
import { ActivityTypeService } from './services/activity-types.service';
import { ActivityDocument } from './entities/activity-document.entity';
import { ActivityTypesController } from './controllers/activity-types.controller';
import { ActivityDocumentService } from './services/activity-document.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Activity, ActivityType, ActivityDocument]),
  ],
  controllers: [ActivityController, ActivityTypesController],
  providers: [ActivityService, ActivityTypeService, ActivityDocumentService],
})
export class ActivitiesModule {}
