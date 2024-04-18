import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({
    example: 'Jamaica',
    description: 'The name of the trip',
  })
  name: string;

  @ApiProperty({
    example: ['Amsterdam', 'Paris', 'London'],
    description: 'An array of city names for your trip',
  })
  places: string[];

  @ApiProperty({
    example: '2024-07-01',
    description: 'The start date of the trip',
  })
  startDate: Date;

  @ApiProperty({
    example: '2024-07-15',
    description: 'The end date of the trip',
  })
  endDate: Date;

  @ApiProperty({
    example: true,
    description: 'Is a visa required to enter any of the places in the trip',
  })
  visaRequired: true | false;

  @ApiProperty({ example: 5000, description: 'The budget for the trip' })
  budget: number;
}
