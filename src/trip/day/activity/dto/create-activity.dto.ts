import { ApiProperty } from '@nestjs/swagger';

export class CreateActivityDto {
  @ApiProperty({
    example: 'Snorkeling',
    description: 'The name of the activity',
  })
  name: string;

  @ApiProperty({
    example: 'Snorkeling in the coral reef',
    description: 'The description of the activity',
  })
  description?: string;
}
