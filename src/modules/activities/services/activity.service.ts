import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActivityTypeService } from './activity-types.service';
import { ActivityImagesService } from './activity-images.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly _repository: Repository<Activity>,
    private readonly _activityTypeService: ActivityTypeService,
    private readonly _activityImageService: ActivityImagesService,
  ) {}

  async createActivity(payload: CreateActivityDto) {
    const activityType = await this._activityTypeService.findOne(payload.type);

    if (!activityType) throw new Error('Invalid activity type');

    const { images, ...activityPayload } = payload;

    const activity = this._repository.create({
      ...activityPayload,
      type: activityType,
    });

    await this._repository.save(activity);

    if (images.length > 0)
      await this._activityImageService.saveImages(images, activity);

    return { ...activity, type: activityType };
  }

  async findAllActivities() {
    return this._repository.find({
      relations: { type: true, documents: true },
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        endDate: true,
        location: true,
        status: true,
      },
    });
  }
}
