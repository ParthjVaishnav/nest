import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { RegisterUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // ✅ Check if email exists before registering
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // ✅ Register user with hashed password & prevent duplicate emails
  async registerUser(registerDto: RegisterUserDto): Promise<{ success: boolean; message: string; user?: User }> {
    const { username, email, password } = registerDto;

    // Check if the email is already registered
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ username, email, password: hashedPassword });

    await this.userRepository.save(user);

    return {
      success: true,
      message: 'User registered successfully',
      user,
    };
  }

  // ✅ Create a user (alternative method)
  async createUser(body: { email: string; username: string; password: string }): Promise<User> {
    const existingUser = await this.findByEmail(body.email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const newUser = new User();
    newUser.email = body.email;
    newUser.username = body.username;
    newUser.password = await bcrypt.hash(body.password, 10); // Ensure password is hashed

    return await this.userRepository.save(newUser);
  }

  // ✅ Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
