import { ApiProperty } from '@nestjs/swagger';

export class UpdateExpenseDto {
  @ApiProperty({
    example: 'Scuba diving gear rental',
    description: 'The updated description of the expense',
  })
  description?: string;

  @ApiProperty({
    example: 75,
    description: 'The updated amount of the expense',
  })
  amount?: number;
}
