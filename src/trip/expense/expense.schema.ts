import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Expense extends Document {
  @ApiProperty({
    example: 'Snorkeling gear rental',
    description: 'The description of the expense',
  })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 50, description: 'The amount of the expense' })
  @Prop({ required: true })
  amount: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
