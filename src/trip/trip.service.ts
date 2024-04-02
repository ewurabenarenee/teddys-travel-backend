import {
  Injectable,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './trip.schema';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: Model<Trip>,
    private readonly userService: UserService,
  ) {}

  async create(createTripDto: CreateTripDto, user: any): Promise<Trip> {
    const createdTrip = new this.tripModel({
      ...createTripDto,
      user: user.sub,
    });
    const savedTrip = await createdTrip.save();
    await this.userService.addTripToUser(user.sub, savedTrip._id);
    return savedTrip;
  }

  async findAll(user: any): Promise<Trip[]> {
    const trips = await this.tripModel.find({ user: user.sub }).exec();
    return trips;
  }

  async getTripById(@Param('id') id: string, user: any): Promise<Trip> {
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

  async deleteTripById(@Param('id') id: string, user: any): Promise<Trip> {
    await this.getTripById(id, user);
    const deletedTrip = await this.tripModel.findByIdAndDelete(id).exec();
    await this.userService.removeTripFromUser(user.sub, id);
    return deletedTrip;
  }

  async updateTripById(
    @Param('id') id: string,
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
}
