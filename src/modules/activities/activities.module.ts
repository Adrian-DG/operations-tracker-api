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
import { ActivitySubType } from './entities/activity-subtype.entity';
import { ActivitySubTypeService } from './services/activity-subtype.service';
import { ActivitySubtypesController } from './controllers/activity-subtype.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Activity,
      ActivityType,
      ActivitySubType,
      ActivityDocument,
    ]),
  ],
  controllers: [
    ActivityController,
    ActivityTypesController,
    ActivitySubtypesController,
  ],
  providers: [
    ActivityService,
    ActivityTypeService,
    ActivitySubTypeService,
    ActivityDocumentService,
  ],
})
export class ActivitiesModule {}
