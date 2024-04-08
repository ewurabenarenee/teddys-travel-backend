import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeather(place: string) {
    const response = await axios.get(`https://wttr.in/${place}?format=j1`);
    const data = response.data;

    const currentTemp = data.current_condition[0].temp_C;
    const next2DaysTemp = data.weather.slice(1, 3).map((day) => day.avgtempC);

    return {
      currentTemp,
      next2DaysTemp,
    };
  }
}
