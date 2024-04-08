import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
  @ApiProperty({
    example: 'Snorkeling',
    description: 'The name of the activity',
  })
  @Prop({ required: true })
  name: string;

  @ApiProperty({
    example: 'Snorkeling in the coral reef',
    description: 'The description of the activity',
  })
  @Prop()
  description: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
