import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.authService.validateUser(body.email, body.password); // ✅ Directly return token
  }

  @Post('register')
  async register(@Body() body: { email: string; username: string; password: string }) {
    return await this.authService.registerUser(body.email, body.username, body.password);
  }
}
