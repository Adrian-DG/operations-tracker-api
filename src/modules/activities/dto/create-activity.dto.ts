import { ApiProperty } from '@nestjs/swagger';
import { ActivityStatus } from '../enums/activity-status.enum';
import { IsArray, IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { CreateActivityDocument } from './create-activity-document.dto';

export class CreateActivityDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @IsDate()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The start date of the activity',
    default: new Date(),
    format: 'date-time',
  })
  readonly startDate: Date;

  @IsDate()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The end date of the activity',
    default: new Date(),
    format: 'date-time',
  })
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
  @ApiProperty({ type: CreateActivityDocument, isArray: true })
  documents: CreateActivityDocument[];
}
