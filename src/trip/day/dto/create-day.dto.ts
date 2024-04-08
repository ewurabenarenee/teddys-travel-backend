import { ApiProperty } from '@nestjs/swagger';

export class CreateDayDto {
  @ApiProperty({ example: '2024-07-01', description: 'The date of the day' })
  date: Date;
}
