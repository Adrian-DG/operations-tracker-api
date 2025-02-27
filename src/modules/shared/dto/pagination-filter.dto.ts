import { ApiProperty } from '@nestjs/swagger';

export class PaginationFilter {
  @ApiProperty({ type: Number, required: true, default: 1 })
  page: number;

  @ApiProperty({ type: Number, required: true, default: 10 })
  limit: number;

  @ApiProperty({ type: String, required: false, default: '' })
  search: string;
}
