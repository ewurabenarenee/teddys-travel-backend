import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Trip } from 'src/trip/trip.schema';

@Schema()
export class User extends Document {
  @ApiProperty({ example: 'Sophie', description: 'The first name of the user' })
  @Prop({ required: true })
  firstName: string;

  @ApiProperty({ example: 'Humbry', description: 'The last name of the user' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({
    example: 'Sophie@hotmail.com',
    description: 'The email address of the user',
    uniqueItems: true,
  })
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  role: 'admin' | 'User';

  @ApiProperty({
    example: '•••••••••',
    description: 'The password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example:
      'https://res.cloudinary.com/example/image/upload/v1234567890/profile-picture.jpg',
    description: "The URL of the user's profile picture",
  })
  @Prop()
  profilePictureUrl: string;

  @ApiProperty({ description: 'The trips created by the user' })
  @Prop({
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'Trip',
  })
  trips: Trip[];
}

export const UserSchema = SchemaFactory.createForClass(User);
