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
    example: 'Teacher',
    description: 'The occupation of the user',
  })
  @Prop({ required: true })
  occupation: string;

  @ApiProperty({
    example: '+31-6543-1198',
    description: 'The phone number of the user',
  })
  @Prop({ required: true })
  phone: string;

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

  @ApiProperty({ description: 'The trips created by the user' })
  @Prop({
    type: [mongoose.Types.ObjectId],
    default: [],
    ref: 'Trip',
  })
  trips: Trip[];
}

export const UserSchema = SchemaFactory.createForClass(User);
