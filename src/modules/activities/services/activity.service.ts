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
    private readonly _activityDocumentService: ActivityDocumentService,
  ) {}

  async createActivity(payload: CreateActivityDto) {
    const { documents, ...activityPayload } = payload;

    return await this._repository.manager.transaction(async (entityManager) => {
      const activity = entityManager.create(Activity, {
        ...activityPayload,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        activityStatus: payload.status,
        activityTypeId: payload.type,
        activitySubTypeId: payload.subType,
      });

      await entityManager.save(activity);

      if (documents.length > 0) {
        await this._activityDocumentService.saveDocuments(documents, activity);
      }

      return { ...activity };
    });
  }

  async findAllActivities(page: number, limit: number, search: string) {
    const [records, total] = await this._repository.findAndCount({
      relations: { activityType: true, activitySubType: true },
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
        activitySubType: { name: true },
        activityType: { name: true },
        startDate: true,
        endDate: true,
      },
    });

    return { records, total } as PagedData<any>;
  }
}
