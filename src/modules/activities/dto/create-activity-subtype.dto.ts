import { ApiProperty } from '@nestjs/swagger';

export class CreateActivitySubTypeDto {
  @ApiProperty({ required: true, type: String })
  name: string;

  @ApiProperty({ required: true, type: Number })
  activityTypeId: number;
}
