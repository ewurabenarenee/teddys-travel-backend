import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { ActivityService } from './activity/activity.service';
import { CreateActivityDto } from './activity/dto/create-activity.dto';
import { UpdateActivityDto } from './activity/dto/update-activity.dto';
import { Day } from './day.schema';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';

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
    return await this.dayModel.findById(id).populate('activities').exec();
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
    const day = await this.dayModel.findById(dayId);
    return day.activities;
  }

  async removeActivity(dayId: string, activityId: string): Promise<Day> {
    return await this.dayModel
      .findByIdAndUpdate(
        dayId,
        {
          $pull: {
            activities: { _id: new mongoose.Types.ObjectId(activityId) },
          },
        },
        { new: true },
      )
      .exec();
  }

  async updateActivity(
    dayId: string,
    activityId: string,
    updateActivityDto: UpdateActivityDto,
  ) {
    const updatedActivity = await this.activityService.update(
      activityId,
      updateActivityDto,
    );

    await this.dayModel.updateOne(
      { _id: dayId, 'activities._id': new mongoose.Types.ObjectId(activityId) },
      { $set: { 'activities.$': updatedActivity } },
    );

    return updatedActivity;
  }

  async moveActivityUp(dayId: string, activityId: string): Promise<Day> {
    const day = await this.dayModel.findById(dayId);
    const activityIndex = day.activities.findIndex(
      (activity) => activity._id.toString() === activityId,
    );
    if (activityIndex > 0) {
      const tmp = day.activities[activityIndex];
      day.activities[activityIndex] = day.activities[activityIndex - 1];
      day.activities[activityIndex - 1] = tmp;
      await day.save();
    }
    return day;
  }

  async moveActivityDown(dayId: string, activityId: string): Promise<Day> {
    const day = await this.dayModel.findById(dayId);
    const activityIndex = day.activities.findIndex(
      (activity) => activity._id.toString() === activityId,
    );
    if (activityIndex < day.activities.length - 1) {
      const tmp = day.activities[activityIndex];
      day.activities[activityIndex] = day.activities[activityIndex + 1];
      day.activities[activityIndex + 1] = tmp;
      await day.save();
    }
    return day;
  }
}
