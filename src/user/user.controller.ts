import {
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
  BadRequestException,
  UsePipes,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.decorator';
import { UserDTO, UserLoginDTO } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() user: UserDTO) {
    try {
      await this.userService.createUser(user);
      return {
        success: true,
        message: 'Sucessfully created user.',
      };
    } catch (err) {
      const errors = err?.meta?.target;

      if (errors?.some((i: string) => i === 'email')) {
        return new BadRequestException('Email is already in-use.');
      } else if (errors?.some((i: string) => i === 'phone')) {
        return new BadRequestException('Phone is already in-use.');
      }

      return new InternalServerErrorException();
    }
  }

  @Post('login')
  loginUser(@Body() user: UserLoginDTO) {
    return this.userService
      .getUserByEmail(user.email)
      .then((fullUser) => {
        if (!fullUser || user.password !== fullUser.password) {
          return new BadRequestException("Email or password doesn't match.");
        }
        delete fullUser.password;
        return fullUser;
      })
      .then((fullUser: any) => {
        fullUser.token = this.userService.createToken(fullUser.id);
        return fullUser;
      })
      .catch(() => {
        return new InternalServerErrorException();
      });
  }

  @Get('me')
  getCurrentUser(@User() userId: number) {
    return this.userService
      .getUserById(userId)
      .then((user) => {
        delete user.password;
        return user;
      })
      .catch(() => {
        return new BadRequestException();
      });
  }
}
