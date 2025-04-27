import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/modules/authentication/guards/auth.guard';
import { PermissionsGuard } from 'src/modules/authentication/guards/Permissions.guard';
import { PaginationFilter } from 'src/modules/shared/dto/pagination-filter.dto';
import { ActivitySubTypeService } from '../services/activity-subtype.service';
import { HasPermissions } from 'src/modules/authentication/decorators/permissions.decorator';
import { Permissions } from 'src/modules/authentication/enums/Permissions.enum';
import { CreateActivitySubTypeDto } from '../dto/create-activity-subtype.dto';

@ApiTags('activity-subtypes')
@Controller('activity-subtypes')
@UseGuards(AuthGuard, PermissionsGuard)
export class ActivitySubtypesController {
  constructor(
    private readonly _activitySubTypeService: ActivitySubTypeService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all activity subtypes' })
  @ApiQuery({ type: PaginationFilter, required: true })
  @HasPermissions(Permissions.VIEW_ACTIVITY_SUBTYPES)
  async getAllActivitySubtypes(@Query() filters: PaginationFilter) {
    return this._activitySubTypeService.findAll(filters);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new activity subtype' })
  @HasPermissions(Permissions.CREATE_ACTIVITY_SUBTYPES)
  async createActivitySubType(@Body() payload: CreateActivitySubTypeDto) {
    return this._activitySubTypeService.create(payload);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an activity subtype' })
  @HasPermissions(Permissions.EDIT_ACTIVITY_SUBTYPES)
  async updateActivitySubType(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() payload: CreateActivitySubTypeDto,
  ) {
    return this._activitySubTypeService.update(id, payload);
  }
}
