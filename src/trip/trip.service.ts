import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { DayService } from './day/day.service';
import { CreateDayDto } from './day/dto/create-day.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { CreateExpenseDto } from './expense/dto/create-expense.dto';
import { ExpenseService } from './expense/expense.service';
import { Trip } from './trip.schema';
import { CreateActivityDto } from './day/activity/dto/create-activity.dto';

function getDates(startDate: Date, endDate: Date) {
  const dates = [];
  let currentDate = startDate;
  const addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
  while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }
  return dates;
}

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: Model<Trip>,
    private readonly userService: UserService,
    private readonly expenseService: ExpenseService,
    private readonly dayService: DayService,
  ) {}

  async create(createTripDto: CreateTripDto, user: any): Promise<Trip> {
    const createdTrip = new this.tripModel({
      ...createTripDto,
      user: user.sub,
    });

    const savedTrip = await createdTrip.save();

    const dates = getDates(savedTrip.startDate, savedTrip.endDate);

    for (const date of dates) {
      this.createDay(savedTrip._id.toString(), { date: date }, user);
    }

    await this.userService.addTripToUser(user.sub, savedTrip._id);
    return savedTrip;
  }

  async findAll(user: any): Promise<Trip[]> {
    const trips = await this.tripModel.find({ user: user.sub }).exec();
    return trips;
  }

  async getTripById(id: string, user: any): Promise<Trip> {
    const trip = await this.tripModel.findById(id).exec();
    if (!trip) {
      throw new NotFoundException('Trip does not exist!');
    }
    if (trip.user !== user.sub) {
      throw new UnauthorizedException('You are not allowed to view this trip!');
    } else {
      return trip;
    }
  }

  async deleteTripById(id: string, user: any): Promise<Trip> {
    await this.getTripById(id, user);
    const deletedTrip = await this.tripModel.findByIdAndDelete(id).exec();
    await this.userService.removeTripFromUser(user.sub, id);
    return deletedTrip;
  }

  async updateTripById(
    id: string,
    updateTripDto: UpdateTripDto,
    user: any,
  ): Promise<Trip> {
    await this.getTripById(id, user);
    const trip = await this.tripModel.findByIdAndUpdate(id, updateTripDto, {
      new: true,
      runValidators: true,
    });
    return trip;
  }

  async addExpenseToTrip(tripId: string, expenseId: string): Promise<Trip> {
    const trip = await this.tripModel.findByIdAndUpdate(
      tripId,
      { $push: { expenses: expenseId } },
      { new: true },
    );
    return trip;
  }

  async removeExpenseFromTrip(
    tripId: string,
    expenseId: string,
  ): Promise<Trip> {
    const trip = await this.tripModel.findByIdAndUpdate(
      tripId,
      { $pull: { expenses: expenseId } },
      { new: true },
    );
    return trip;
  }

  async createExpense(
    tripId: string,
    createExpenseDto: CreateExpenseDto,
    user: any,
  ) {
    const trip = await this.getTripById(tripId, user);
    const expense = await this.expenseService.createExpense(createExpenseDto);
    trip.expenses.push(expense);
    await trip.save();
    return expense;
  }

  async findAllExpenses(tripId: string, user: any) {
    await this.getTripById(tripId, user);
    return await this.expenseService.findAllExpenses(tripId);
  }

  async createDay(tripId: string, createDayDto: CreateDayDto, user: any) {
    const trip = await this.getTripById(tripId, user);
    const day = await this.dayService.createDay(createDayDto);
    trip.days.push(day);
    await trip.save();
    return day;
  }

  async findAllDays(tripId: string, user: any) {
    await this.getTripById(tripId, user);
    return await this.dayService.findAllDays(tripId);
  }

  async createActivity(
    tripId: string,
    dayId: string,
    createActivityDto: CreateActivityDto,
    user: any,
  ) {
    await this.getTripById(tripId, user);
    return await this.dayService.createActivity(dayId, createActivityDto);
  }

  async findAllActivities(tripId: string, dayId: string, user: any) {
    await this.getTripById(tripId, user);
    return await this.dayService.findAllActivities(dayId);
  }
}
