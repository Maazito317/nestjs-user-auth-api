import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User } from '../users/user.entity';

/**
 * AuthService handles core authentication logic including:
 * - user registration
 * - login credential validation
 * - password hashing
 * - JWT token generation
 */
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user by validating input, hashing the password,
   * and saving the user to the database.
   * @param signupDto The user's registration details
   * @returns The newly created user (excluding password)
   * @throws BadRequestException if email is already in use
   */
  async signup(signupDto: SignupDto) {
    const { email, password, firstName, lastName } = signupDto;

    // Check if a user with this email already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    // Hash the password for secure storage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entity
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // Save the user in the database
    const savedUser = await this.userRepository.save(user);

    // Remove password before returning
    const { password: _, ...result } = savedUser;
    return result;
  }

  /**
   * Authenticates a user using email and password.
   * If valid, returns a signed JWT access token.
   * @param loginDto The user's login credentials
   * @returns Object containing the access token
   * @throws BadRequestException if credentials are invalid
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user and explicitly select password
    const user = await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // Compare password with hashed value
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    // Sign and return JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      accessToken: token,
    };
  }
}
