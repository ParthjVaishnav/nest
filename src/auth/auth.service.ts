import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService, // ✅ Inject MailService
  ) {}

  // ✅ Register User and Send Welcome Email
  async registerUser(email: string, username: string, password: string): Promise<{ user: User; access_token: string }> {
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create User
    const user = await this.userService.createUser({ email, username, password: hashedPassword });

    // ✅ Generate JWT Token
    const token = this.jwtService.sign({ id: user.id, email: user.email });

    // ✅ Send Welcome Email
    try {
      await this.mailService.sendRegistrationMail(user.username, user.email);
    } catch (error) {
      console.error('Failed to send email:', error.message);
    }

    return { user, access_token: token };
  }

  // ✅ Validate User & Generate Token
  async validateUser(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });
    return { access_token: token };
  }
}
