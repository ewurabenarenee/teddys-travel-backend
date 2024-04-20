import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateActivityDto } from './activity/dto/update-activity.dto';
import { DayService } from './day.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

@ApiTags('day')
@Controller('trip/:tripId/day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post()
  async createDay(
    @Param('tripId') tripId: string,
    @Body() createDayDto: CreateDayDto,
  ) {
    return await this.dayService.createDay(createDayDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  async findAllDays(@Param('tripId') tripId: string) {
    return await this.dayService.findAllDays(tripId);
  }

  @Get()
  async findAll() {
    return await this.dayService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dayService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return await this.dayService.update(id, updateDayDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dayService.remove(id);
  }

  @Put(':dayId/activity/:activityId')
  async updateActivity(
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return await this.dayService.updateActivity(
      dayId,
      activityId,
      updateActivityDto,
    );
  }

  @Put(':dayId/activity/:activityId/move-up')
  async moveActivityUp(
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return await this.dayService.moveActivityUp(dayId, activityId);
  }

  @Put(':dayId/activity/:activityId/move-down')
  async moveActivityDown(
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
  ) {
    return await this.dayService.moveActivityDown(dayId, activityId);
  }
}
