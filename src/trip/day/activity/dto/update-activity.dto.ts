import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto {
  @ApiProperty({
    example: 'Scuba Diving',
    description: 'The updated name of the activity',
  })
  name?: string;

  @ApiProperty({
    example: 'Scuba diving in the coral reef',
    description: 'The updated description of the activity',
  })
  description?: string;
}
