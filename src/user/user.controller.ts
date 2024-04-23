import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Request,
  UnauthorizedException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Put('profile')
  @UseGuards(AuthGuard)
  @ApiOkResponse({
    type: User,
    description: "The user's profile has been successfully updated",
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateUser(
    @Request() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    return await this.userService.updateUser(userId, updateUserDto);
  }

  @Put('profile/picture')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: User,
    description: "The user's profile picture has been successfully updated",
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async updateProfilePicture(
    @Request() req,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<User> {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not found');
    }
    return await this.userService.updateProfilePicture(userId, file);
  }
}
