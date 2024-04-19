import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateActivityDto } from './day/activity/dto/create-activity.dto';
import { CreateDayDto } from './day/dto/create-day.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { ShareTripDto } from './dto/share-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { CreateExpenseDto } from './expense/dto/create-expense.dto';
import { Trip } from './trip.schema';
import { TripService } from './trip.service';

@ApiTags('trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({
    type: Trip,
    description: 'The trip has been successfully created',
  })
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTripDto: CreateTripDto,
    @Request() req,
  ): Promise<Trip> {
    return await this.tripService.create(createTripDto, req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: [Trip],
    description: 'The trips have been successfully retrieved',
  })
  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Request() req): Promise<Trip[]> {
    return await this.tripService.findAll(req.user);
  }

  @ApiBearerAuth()
  @ApiOkResponse({
    type: Trip,
    description: 'The trip has been successfully retrieved',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getTripById(@Param('id') id: string, @Request() req): Promise<Trip> {
    return await this.tripService.getTripById(id, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTrip(@Param('id') id: string, @Request() req): Promise<Trip> {
    return await this.tripService.deleteTripById(id, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTripById(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @Request() req,
  ): Promise<Trip> {
    return await this.tripService.updateTripById(id, updateTripDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':tripId/expense')
  async createExpense(
    @Param('tripId') tripId: string,
    @Body() createExpenseDto: CreateExpenseDto,
    @Request() req,
  ) {
    return await this.tripService.createExpense(
      tripId,
      createExpenseDto,
      req.user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':tripId/expense')
  async findAllExpenses(@Param('tripId') tripId: string, @Request() req) {
    return await this.tripService.findAllExpenses(tripId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':tripId/day')
  async createDay(
    @Param('tripId') tripId: string,
    @Body() createDayDto: CreateDayDto,
    @Request() req,
  ) {
    return await this.tripService.createDay(tripId, createDayDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':tripId/day')
  async findAllDays(@Param('tripId') tripId: string, @Request() req) {
    return await this.tripService.findAllDays(tripId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':tripId/day/:dayId/activity')
  async createActivity(
    @Param('tripId') tripId: string,
    @Param('dayId') dayId: string,
    @Body() createActivityDto: CreateActivityDto,
    @Request() req,
  ) {
    return await this.tripService.createActivity(
      tripId,
      dayId,
      createActivityDto,
      req.user,
    );
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':tripId/day/:dayId/activity')
  async findAllActivities(
    @Param('tripId') tripId: string,
    @Param('dayId') dayId: string,
    @Request() req,
  ) {
    return await this.tripService.findAllActivities(tripId, dayId, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':tripId/day/:dayId/activity/:activityId')
  async removeActivity(
    @Param('tripId') tripId: string,
    @Param('dayId') dayId: string,
    @Param('activityId') activityId: string,
    @Request() req,
  ) {
    await this.tripService.removeActivity(tripId, dayId, activityId, req.user);
    return { message: 'Activity removed successfully' };
  }

  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  async updateTripImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<Trip> {
    return await this.tripService.updateTripImage(id, file, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post(':tripId/share')
  async shareTrip(
    @Param('tripId') tripId: string,
    @Body() shareDto: ShareTripDto,
    @Request() req: any,
  ): Promise<{ message: string }> {
    await this.tripService.shareTrip(
      tripId,
      shareDto.recipientName,
      shareDto.recipientEmail,
    );
    return { message: 'Trip shared successfully' };
  }
}
