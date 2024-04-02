import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'User logged in successfully' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }
}
