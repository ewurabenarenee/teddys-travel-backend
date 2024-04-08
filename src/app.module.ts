import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/teddys-travel'),
    UserModule,
    TripModule,
    AuthModule,
    WeatherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
