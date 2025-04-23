import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivitySubType } from '../entities/activity-subtype.entity';
import { Like, Repository } from 'typeorm';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { PagedData } from 'src/modules/shared/models/paged-data.model';

@Injectable()
export class ActivitySubTypeService {
  constructor(
    @InjectRepository(ActivitySubType)
    private readonly _repository: Repository<ActivitySubType>,
  ) {}

  async findAll(filters: PaginationFilter) {
    const { page, limit, search } = filters;
    const [records, total] = await this._repository.findAndCount({
      relations: { ActivityType: true },
      where: {
        name: search ? Like(`%${search}%`) : '',
      },
      select: { id: true, name: true, ActivityType: { id: true, name: true } },
      take: limit,
      skip: (page - 1) * limit,
    });

    return { records, total } as PagedData<any>;
  }
}
