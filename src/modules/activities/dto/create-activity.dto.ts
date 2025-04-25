import { ApiProperty } from '@nestjs/swagger';
import { ActivityStatus } from '../enums/activity-status.enum';
import {
  IsArray,
  IsDataURI,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateActivityDocument } from './create-activity-document.dto';
import { Type } from 'class-transformer';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsDateString()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The start date of the activity',
    default: new Date(),
    format: 'date',
  })
  readonly startDate: string;

  @IsDateString()
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The end date of the activity',
    default: new Date(),
    format: 'date-time',
  })
  readonly endDate: string;

  @ApiProperty()
  readonly location: string;

  @IsEnum(ActivityStatus)
  @ApiProperty({
    enum: ActivityStatus,
    required: true,
    default: ActivityStatus.IN_PROGRESS,
  })
  readonly status: ActivityStatus;

  @IsNumber()
  @ApiProperty({ required: true })
  readonly type: number;

  @IsNumber()
  @ApiProperty({ required: true })
  readonly subType: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateActivityDocument)
  @ApiProperty({ type: CreateActivityDocument, isArray: true })
  documents: CreateActivityDocument[];
}
