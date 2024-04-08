import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from './day.schema';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { ActivityService } from './activity/activity.service';
import { CreateActivityDto } from './activity/dto/create-activity.dto';

@Injectable()
export class DayService {
  constructor(
    @InjectModel(Day.name)
    private dayModel: Model<Day>,
    private readonly activityService: ActivityService,
  ) {}

  async createDay(createDayDto: CreateDayDto): Promise<Day> {
    const createdDay = new this.dayModel(createDayDto);
    return await createdDay.save();
  }

  async findAllDays(tripId: string): Promise<Day[]> {
    return await this.dayModel.find({ trip: tripId }).exec();
  }

  async findAll(): Promise<Day[]> {
    return await this.dayModel.find().exec();
  }

  async findOne(id: string): Promise<Day> {
    return await this.dayModel.findById(id).exec();
  }

  async update(id: string, updateDayDto: UpdateDayDto): Promise<Day> {
    return await this.dayModel
      .findByIdAndUpdate(id, updateDayDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Day> {
    return await this.dayModel.findByIdAndDelete(id).exec();
  }

  async createActivity(dayId: string, createActivityDto: CreateActivityDto) {
    const activity = await this.activityService.create(createActivityDto);
    const day = await this.dayModel.findByIdAndUpdate(
      dayId,
      { $push: { activities: activity } },
      { new: true },
    );
    return activity;
  }

  async findAllActivities(dayId: string) {
    const day = await this.dayModel.findById(dayId).populate('activities');
    return day.activities;
  }
}
