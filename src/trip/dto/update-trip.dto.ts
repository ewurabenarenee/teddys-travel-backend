import { ApiProperty } from '@nestjs/swagger';

export class UpdateTripDto {
  @ApiProperty({
    example: 'Jamaica',
    description: 'The updated name of the trip',
  })
  name?: string;

  @ApiProperty({
    example: '2024-07-01',
    description: 'The updated start date of the trip',
  })
  startDate?: Date;

  @ApiProperty({
    example: '2024-07-15',
    description: 'The updated end date of the trip',
  })
  endDate?: Date;

  @ApiProperty({
    example: true,
    description: 'Is a visa required to enter any of the places in the trip',
  })
  visaRequired: true | false;
}
