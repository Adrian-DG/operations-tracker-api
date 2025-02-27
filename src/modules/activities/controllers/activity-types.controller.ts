import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { ActivityTypeService } from '../services/activity-types.service';
import { CreateActivityTypeDto } from '../dto/create-activity-type.dto';

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
  @ApiBody({ type: CreateActivityTypeDto, required: true })
  @HasPermissions(Permissions.CREATE_ACTIVITIES)
  async createActivityType(@Body() payload: CreateActivityTypeDto) {
    return this._activityTypeService.create(payload.name);
  }
}
