import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @Public()
  @ApiCreatedResponse({
    type: User,
    description: 'The user has been successfully created',
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: User,
    description: "The user's profile has been successfully retrieved",
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProfile(@Request() req): Promise<User> {
    const email = req.user?.email;
    // console.log(req.user);
    if (!email) {
      throw new UnauthorizedException('User not found');
    }
    return await this.userService.findUserByEmail(email);
  }
}
