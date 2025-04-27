import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';

export class ActivityPaginationFilterDto extends PaginationFilter {
  startDate: string | null;
  endDate: string | null;
  type: number | null;
  subType: number | null;
}
