import { ApiProperty } from '@nestjs/swagger';

export class ShareTripDto {
  @ApiProperty({
    example: 'Sophie Humbry',
    description: 'The name of the recipient',
  })
  recipientName: string;

  @ApiProperty({
    example: 'sophie.humbry@gmail.com',
    description: 'The email address of the recipient',
  })
  recipientEmail: string;
}
