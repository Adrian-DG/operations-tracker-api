import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Repository } from 'typeorm';
import { ActivityType } from '../entities/activity-type.entity';
import { ActivityImage } from '../entities/activity-image.entity';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly _activityRepository: Repository<Activity>,
    @InjectRepository(ActivityType)
    private readonly _activityTypeRepository: Repository<ActivityType>,
    @InjectRepository(ActivityImage)
    private readonly _activityImageRepository: Repository<ActivityImage>,
  ) {}

  private async findActivityType(type: number) {
    return this._activityTypeRepository.findOne({ where: { id: type } });
  }

  private async saveImages(images: string[], activity: Activity) {
    const activityImages = images.map((image) =>
      this._activityImageRepository.create({
        image: Buffer.from(image, 'base64'),
        activity,
      }),
    );

    return this._activityImageRepository.save(activityImages);
  }

  async createActivity(payload: CreateActivityDto) {
    const activityType = await this.findActivityType(payload.type);

    if (!activityType) throw new Error('Invalid activity type');

    const { images, ...activityPayload } = payload;

    const activity = this._activityRepository.create({
      ...activityPayload,
      type: activityType,
    });

    await this._activityRepository.save(activity);

    if (images.length > 0) await this.saveImages(images, activity);

    return { ...activity, type: activityType };
  }

  async findAllActivities() {
    return this._activityRepository.find({
      relations: { type: true, images: true },
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
