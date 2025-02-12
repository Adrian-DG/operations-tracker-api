import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from '../services/activity.service';
import { CreateActivityDto } from '../dto/create-activity.dto';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';

@UseGuards(AuthGuard, PermissionsGuard)
@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly _activityService: ActivityService) {}

  @Get()
  @HasPermissions(Permissions.VIEW_ACTIVITIES)
  async getAllActivities() {
    return this._activityService.findAllActivities();
  }

  @Post()
  @HasPermissions(Permissions.CREATE_ACTIVITIES)
  async createActivity(@Body() payload: CreateActivityDto) {
    return this._activityService.createActivity(payload);
  }
}
