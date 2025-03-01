import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityType } from '../entities/activity-type.entity';
import { Like, Repository } from 'typeorm';
import { PagedData } from 'src/modules/shared/models/paged-data.model';

@Injectable()
export class ActivityTypeService {
  constructor(
    @InjectRepository(ActivityType)
    private readonly _repository: Repository<ActivityType>,
  ) {}

  async findAll(page: number, limit: number, search: string) {
    const [records, total] = await this._repository.findAndCount({
      where: { name: Like(`%${search}%`) },
      take: limit,
      skip: (page - 1) * limit,
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });

    return { records, total } as PagedData<any>;
  }

  async findOne(type: number) {
    return this._repository.findOne({ where: { id: type } });
  }

  async create(payload: string) {
    const activityType = this._repository.create({
      name: payload,
    });

    return this._repository.save(activityType);
  }
}
