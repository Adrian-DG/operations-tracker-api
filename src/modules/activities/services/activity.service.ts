import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import { Like, Repository } from 'typeorm';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActivityTypeService } from './activity-types.service';
import { ActivityDocumentService } from './activity-document.service';
import { PagedData } from 'src/modules/shared/models/paged-data.model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly _repository: Repository<Activity>,
    private readonly _activityTypeService: ActivityTypeService,
    private readonly _activityDocumentService: ActivityDocumentService,
  ) {}

  async createActivity(payload: CreateActivityDto) {
    console.log(payload);

    const activityType = await this._activityTypeService.findOne(payload.type);

    if (!activityType) throw new Error('Invalid activity type');

    const { documents, ...activityPayload } = payload;

    const activity = this._repository.create({
      ...activityPayload,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      type: activityType,
    });

    console.log(activity);

    await this._repository.save(activity);

    if (documents.length > 0)
      await this._activityDocumentService.saveDocuments(documents, activity);

    return { ...activity, type: activityType };
  }

  async findAllActivities(page: number, limit: number, search: string) {
    const [records, total] = await this._repository.findAndCount({
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
        startDate: true,
        endDate: true,
      },
    });

    return { records, total } as PagedData<any>;
  }
}
