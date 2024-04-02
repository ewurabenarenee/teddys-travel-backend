import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/user.schema';

@Schema()
export class Trip extends Document {
  @ApiProperty({
    example: 'Jamaica',
    description: 'The name of the trip',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: '2024-07-01',
    description: 'The start date of the trip',
  })
  @Prop({ required: true })
  startDate: Date;

  @ApiProperty({
    example: '2024-07-15',
    description: 'The end date of the trip',
  })
  @Prop({ required: true })
  endDate: Date;

  @ApiProperty({
    example: true,
    description: 'Is a visa required to enter any of the places in the trip',
  })
  visaRequired: true | false;

  @ApiProperty({ type: User, description: 'The user who created the trip' })
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: User;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
