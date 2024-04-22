import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Sophie',
    description: 'The new first name of the user',
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    example: 'Humbry',
    description: 'The new last name of the user',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    example: '•••••••••',
    description: 'The new password of the user',
    required: false,
  })
  password?: string;
}
