import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Sophie', description: 'The first name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Humbry', description: 'The last name of the user' })
  lastName: string;

  @ApiProperty({
    example: 'Teacher',
    description: 'The occupation of the user',
  })
  occupation: string;

  @ApiProperty({
    example: '+31-6543-1198',
    description: 'The phone number of the user',
  })
  phone: string;

  @ApiProperty({
    example: 'Sophie@hotmail.com',
    description: 'The email address of the user',
    uniqueItems: true,
  })
  email: string;

  @ApiProperty({
    example: '•••••••••',
    description: 'The password of the user',
  })
  password: string;
}
