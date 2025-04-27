import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from '../entities/activity.entity';
import {
  And,
  Equal,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { ActivityTypeService } from './activity-types.service';
import { ActivityDocumentService } from './activity-document.service';
import { PagedData } from 'src/modules/shared/models/paged-data.model';
import { ActivityPaginationFilterDto } from '../dto/activity-pagination-filter.dto';
import { ActivityDetailModel } from '../models/activity-detail.model';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private readonly _repository: Repository<Activity>,
    private readonly _activityDocumentService: ActivityDocumentService,
  ) {}

  async createActivity(payload: CreateActivityDto, createdBy: number) {
    const { documents, ...activityPayload } = payload;

    return await this._repository.manager.transaction(async (entityManager) => {
      const activity = entityManager.create(Activity, {
        ...activityPayload,
        startDate: new Date(payload.startDate),
        endDate: new Date(payload.endDate),
        activityStatus: payload.status,
        activityTypeId: payload.type,
        activitySubTypeId: payload.subType,
        createdBy: createdBy,
      });

      await entityManager.save(activity);

      if (documents.length > 0) {
        await this._activityDocumentService.saveDocuments(documents, activity);
      }

      return { ...activity };
    });
  }

  async findAllActivities(filters: ActivityPaginationFilterDto) {
    const { page, limit, search } = filters;
    const [records, total] = await this._repository.findAndCount({
      relations: {
        activityType: true,
        activitySubType: true,
        createdByUser: true,
      },
      where: {
        name: Like(`%${search ?? ''}%`),
        ...(filters.startDate && {
          startDate: MoreThanOrEqual(new Date(filters.startDate)),
        }),
        ...(filters.endDate && {
          endDate: LessThanOrEqual(new Date(filters.endDate)),
        }),
        ...(filters.type && { activityTypeId: Equal(filters.type) }),
        ...(filters.subType && { activitySubTypeId: Equal(filters.subType) }),
      },
      take: limit,
      skip: (page - 1) * limit,
      select: {
        id: true,
        name: true,
        description: true,
        location: true,
        activityStatus: true,
        activityTypeId: true,
        activitySubTypeId: true,
        startDate: true,
        endDate: true,
        createdAt: true,
        updatedAt: true,
      },
      order: { createdAt: 'DESC' },
    });

    const activityDetails = records.map((activity) => {
      return {
        ...activity,
        activityTypeName: activity.activityType?.name,
        activitySubTypeName: activity.activitySubType?.name,
        createdBy: activity.createdByUser?.username,
      } as ActivityDetailModel;
    });

    return {
      records: activityDetails,
      total,
    } as PagedData<ActivityDetailModel>;
  }
}
