import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivitySubType } from '../entities/activity-subtype.entity';
import { Equal, Like, Repository } from 'typeorm';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { PagedData } from 'src/modules/shared/models/paged-data.model';
import { CreateActivitySubTypeDto } from '../dto/create-activity-subtype.dto';
import { UpdateActivitySubTypeDto } from '../dto/update-activity-subtype.dto';
import { BaseNamed } from 'src/modules/shared/models/base-named.model';

@Injectable()
export class ActivitySubTypeService {
  constructor(
    @InjectRepository(ActivitySubType)
    private readonly _repository: Repository<ActivitySubType>,
  ) {}

  async findAll(filters: PaginationFilter) {
    const { page, limit, search } = filters;
    const [records, total] = await this._repository.findAndCount({
      relations: { activityType: true },
      where: {
        name: Like(`%${search}%`),
      },
      select: { id: true, name: true, activityType: { id: true, name: true } },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { records, total } as PagedData<any>;
  }

  async create(payload: CreateActivitySubTypeDto) {
    return await this._repository.save(payload);
  }

  async update(id: number, payload: UpdateActivitySubTypeDto) {
    const activitySubType = await this._repository.findOne({ where: { id } });
    if (!activitySubType) return null;
    Object.assign(activitySubType, payload);
    return await this._repository.save(activitySubType);
  }

  async findByActivityType(typeId: number) {
    return await this._repository.find({
      where: { activityTypeId: Equal(typeId) },
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }
}
