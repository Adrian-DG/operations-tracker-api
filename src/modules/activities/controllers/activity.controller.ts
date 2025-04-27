import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from '../services/activity.service';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { request } from 'http';
import { ActivityPaginationFilterDto } from '../dto/activity-pagination-filter.dto';

@UseGuards(AuthGuard, PermissionsGuard)
@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly _activityService: ActivityService) {}

  @Get()
  @HasPermissions(Permissions.VIEW_ACTIVITIES)
  async getAllActivities(@Query() filters: ActivityPaginationFilterDto) {
    return this._activityService.findAllActivities(filters);
  }

  @Post()
  @HasPermissions(Permissions.CREATE_ACTIVITIES)
  async createActivity(
    @Body() payload: CreateActivityDto,
    @Req() request: Request,
  ) {
    return this._activityService.createActivity(payload, request['user'].id);
  }
}
