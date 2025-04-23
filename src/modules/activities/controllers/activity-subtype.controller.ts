import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { ActivitySubTypeService } from '../services/activity-subtype.service';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';

@ApiTags('activity-subtypes')
@Controller('activity-subtypes')
@UseGuards(AuthGuard, PermissionsGuard)
export class ActivitySubtypesController {
  constructor(
    private readonly _activitySubTypeService: ActivitySubTypeService,
  ) {}

  @Get()
  @ApiQuery({ type: PaginationFilter, required: true })
  @HasPermissions(Permissions.VIEW_ACTIVITY_SUBTYPES)
  async getAllActivitySubtypes(@Query() filters: PaginationFilter) {
    return this._activitySubTypeService.findAll(filters);
  }
}
