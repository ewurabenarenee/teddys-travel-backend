import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UploadApiResponse } from 'cloudinary';
import mongoose, { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof import('cloudinary').v2,
  ) {}

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

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashedPassword;
    }

    return user.save();
  }

  async updateProfilePicture(
    userId: string,
    file: Express.Multer.File,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const fileDataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const result: UploadApiResponse = await this.cloudinary.uploader.upload(
      fileDataUri,
      {
        transformation: { width: 500, height: 500, crop: 'fill' },
      },
    );

    user.profilePictureUrl = result.secure_url;
    return user.save();
  }
}
