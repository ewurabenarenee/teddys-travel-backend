import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
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
  // Add Swagger later
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteTrip(@Param('id') id: string, @Request() req): Promise<Trip> {
    return await this.tripService.deleteTripById(id, req.user);
  }

  @ApiBearerAuth()
  // Add Swagger later
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateTripById(
    @Param('id') id: string,
    @Body() updateTripDto: UpdateTripDto,
    @Request() req,
  ): Promise<Trip> {
    return await this.tripService.updateTripById(id, updateTripDto, req.user);
  }
}
