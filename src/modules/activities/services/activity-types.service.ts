import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityType } from '../entities/activity-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivityTypeService {
  constructor(
    @InjectRepository(ActivityType)
    private readonly _repository: Repository<ActivityType>,
  ) {}

  async findAll() {
    return this._repository.find({
      select: ['id', 'name'],
    });
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
