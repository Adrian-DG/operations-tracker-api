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
      select: { id: true, name: true },
      take: limit,
      skip: (page - 1) * limit,
      order: { name: 'ASC' },
    });

    return { records, total } as PagedData<any>;
  }

  async findAllTypes() {
    return await this._repository.find({
      select: { id: true, name: true },
      order: { name: 'ASC' },
    });
  }

  async findOne(type: number) {
    return await this._repository.findOne({ where: { id: type } });
  }

  async create(payload: string) {
    const activityType = this._repository.create({
      name: payload,
    });

    return await this._repository.save(activityType);
  }

  async update(id: number, payload: string) {
    const activityType = await this._repository.findOne({ where: { id } });
    if (!activityType) return null;
    activityType.name = payload;
    return await this._repository.save(activityType);
  }

  async delete(id: number) {
    const activityType = await this._repository.findOne({ where: { id } });
    if (!activityType) return null;
    await activityType.softRemove();
    return activityType;
  }
}
