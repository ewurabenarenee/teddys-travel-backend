import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Get(':place')
  async getWeather(@Param('place') place: string) {
    return await this.weatherService.getWeather(place);
  }
}
