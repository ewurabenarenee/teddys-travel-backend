import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@ApiTags('activity')
@Controller('trip/:tripId/day/:dayId/activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  async create(@Body() createActivityDto: CreateActivityDto) {
    return await this.activityService.create(createActivityDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.activityService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.activityService.remove(id);
  }
}
