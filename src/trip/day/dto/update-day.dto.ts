import { ApiProperty } from '@nestjs/swagger';

export class UpdateDayDto {
  @ApiProperty({
    example: '2024-07-01',
    description: 'The updated date of the day',
  })
  date?: Date;
}
