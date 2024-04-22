import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Sophie', description: 'The first name of the user' })
  firstName: string;

  @ApiProperty({ example: 'Humbry', description: 'The last name of the user' })
  lastName: string;

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
