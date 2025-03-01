import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityTypeDto {
  @ApiProperty({ required: true })
  name: string;
}
