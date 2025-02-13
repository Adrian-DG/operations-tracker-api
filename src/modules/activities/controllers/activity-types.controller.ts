import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { ActivityTypeService } from '../services/activity-types.service';

@UseGuards(AuthGuard, PermissionsGuard)
@ApiTags('activity-types')
@Controller('activity-types')
export class ActivityTypesController {
  constructor(private readonly _activityTypeService: ActivityTypeService) {}

  @Get()
  @HasPermissions(Permissions.VIEW_ACTIVITIES)
  async getAllActivityTypes() {
    return this._activityTypeService.findAll();
  }

  @Post()
  @HasPermissions(Permissions.CREATE_ACTIVITIES)
  async createActivityType(@Body() payload: string) {
    return this._activityTypeService.create(payload);
  }
}
