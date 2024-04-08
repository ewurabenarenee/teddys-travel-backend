import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Document } from 'mongoose';
import { Activity } from './activity/activity.schema';

@Schema()
export class Day extends Document {
  @ApiProperty({ example: '2024-07-01', description: 'The date of the day' })
  @Prop({ required: true })
  date: Date;

  @ApiProperty({ type: [Activity], description: 'The activities of the day' })
  @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'Activity' }] })
  activities: Activity[];
}

export const DaySchema = SchemaFactory.createForClass(Day);
