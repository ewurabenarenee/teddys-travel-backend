import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty({
    example: 'Snorkeling gear rental',
    description: 'The description of the expense',
  })
  description: string;

  @ApiProperty({ example: 50, description: 'The amount of the expense' })
  amount: number;
}
