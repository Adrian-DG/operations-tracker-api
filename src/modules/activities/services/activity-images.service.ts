import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityImage } from '../entities/activity-image.entity';
import { Repository } from 'typeorm';
import { Activity } from '../entities/activity.entity';

@Injectable()
export class ActivityImagesService {
  constructor(
    @InjectRepository(ActivityImage)
    private readonly _repository: Repository<ActivityImage>,
  ) {}

  async saveImages(images: string[], activity: Activity) {
    const activityImages = images.map((image) =>
      this._repository.create({
        image: Buffer.from(image, 'base64'),
        activity,
      }),
    );

    return this._repository.save(activityImages);
  }
}
