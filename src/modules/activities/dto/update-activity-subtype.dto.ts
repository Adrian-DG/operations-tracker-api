import { PartialType } from '@nestjs/mapped-types';
import { CreateActivitySubTypeDto } from './create-activity-subtype.dto';

export class UpdateActivitySubTypeDto extends PartialType(
  CreateActivitySubTypeDto,
) {}
