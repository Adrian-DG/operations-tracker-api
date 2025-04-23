import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { ActivityTypeService } from '../services/activity-types.service';
import { CreateActivityTypeDto } from '../dto/create-activity-type.dto';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { UpdateActivityType } from '../dto/update-activity-type.dt';

@ApiTags('activity-types')
@Controller('activity-types')
@UseGuards(AuthGuard, PermissionsGuard)
export class ActivityTypesController {
  constructor(private readonly _activityTypeService: ActivityTypeService) {}

  @Get()
  @HasPermissions(Permissions.VIEW_ACTIVITY_TYPES)
  async getAllActivityTypes(@Query() filters: PaginationFilter) {
    const { page, limit, search } = filters;
    return this._activityTypeService.findAll(page, limit, search);
  }

  @Get('all')
  async getAllTypes() {
    return this._activityTypeService.findAllTypes();
  }

  @Post()
  @ApiBody({ type: CreateActivityTypeDto, required: true })
  @HasPermissions(Permissions.CREATE_ACTIVITY_TYPES)
  async createActivityType(@Body() payload: CreateActivityTypeDto) {
    return this._activityTypeService.create(payload.name);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiBody({ type: UpdateActivityType, required: true })
  @HasPermissions(Permissions.EDIT_ACTIVITY_TYPES)
  async updateActivityType(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: UpdateActivityType,
  ) {
    if (payload.name) return this._activityTypeService.update(id, payload.name);
    throw new Error('Name is required');
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @HasPermissions(Permissions.DELETE_ACTIVITY_TYPES)
  async deleteActivityType(@Param('id', new ParseIntPipe()) id: number) {
    return this._activityTypeService.delete(id);
  }
}
