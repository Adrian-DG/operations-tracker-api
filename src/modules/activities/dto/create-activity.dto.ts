import { ApiProperty } from '@nestjs/swagger';
import { ActivityStatus } from '../enums/activity-status.enum';
import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @IsDate()
  @ApiProperty()
  readonly startDate: Date;

  @IsDate()
  @ApiProperty()
  readonly endDate: Date;

  @ApiProperty()
  readonly location: string;

  @IsEnum(ActivityStatus)
  @ApiProperty({ enum: ActivityStatus, required: true })
  readonly status: ActivityStatus;

  @IsNumber()
  @ApiProperty({ required: true })
  readonly type: number;

  @IsArray()
  @ApiProperty({ type: 'string', isArray: true })
  images: string[];
}
