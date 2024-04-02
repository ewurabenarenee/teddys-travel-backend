import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async findUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec();
  }

  async addTripToUser(userId: string, tripId: string): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $push: { trips: tripId } },
      { new: true },
    );
    return updatedUser;
  }

  async removeTripFromUser(userId: string, tripId: string): Promise<User> {
    const removeUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { trips: new mongoose.Types.ObjectId(tripId) } },
      { new: true },
    );
    return removeUser;
  }
}
