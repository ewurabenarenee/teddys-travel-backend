import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/teddys-travel'),
    UserModule,
    TripModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
