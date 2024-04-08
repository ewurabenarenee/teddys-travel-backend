import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ActivityModule } from './activity/activity.module';
import { DayController } from './day.controller';
import { Day, DaySchema } from './day.schema';
import { DayService } from './day.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Day.name, schema: DaySchema }]),
    ActivityModule,
  ],
  controllers: [DayController],
  providers: [DayService],
  exports: [DayService],
})
export class DayModule {}
