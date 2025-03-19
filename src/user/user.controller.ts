import { Controller, Post, Get, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async registerUser(@Body() registerDto: RegisterUserDto) {
    try {
      return await this.userService.registerUser(registerDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
