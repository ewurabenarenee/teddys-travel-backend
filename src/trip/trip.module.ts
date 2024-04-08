import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { DayModule } from './day/day.module';
import { ExpenseModule } from './expense/expense.module';
import { TripController } from './trip.controller';
import { Trip, TripSchema } from './trip.schema';
import { TripService } from './trip.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    UserModule,
    DayModule,
    ExpenseModule,
  ],
  controllers: [TripController],
  providers: [TripService],
})
export class TripModule {}
