import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Like, Repository } from 'typeorm';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActivityTypeService } from './activity-types.service';
import { ActivityImagesService } from './activity-document.service';
import { PagedData } from 'src/modules/shared/models/paged-data.model';

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

    const { documents, ...activityPayload } = payload;

    const activity = this._repository.create({
      ...activityPayload,
      type: activityType,
    });

    await this._repository.save(activity);

    if (documents.length > 0)
      await this._activityImageService.saveDocuments(documents, activity);

    return { ...activity, type: activityType };
  }

  async findAllActivities(page: number, limit: number, search: string) {
    const [data, total] = await this._repository.findAndCount({
      relations: { type: true },
      where: {
        name: Like(`%${search ?? ''}%`),
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        type: { name: true },
      },
    });

    return { data, total } as PagedData<any>;
  }
}
