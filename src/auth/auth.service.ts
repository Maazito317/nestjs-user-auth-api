import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

/**
 * AuthService handles the authentication logic:
 * - User registration
 * - Credential verification
 * - Token generation and refresh
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Registers a new user in the system.
   * - Checks if email is taken
   * - Hashes password
   * - Creates user via UsersService
   * @param signupDto DTO with user registration data
   */
  async signup(signupDto: SignupDto) {
    const { email, password, firstName, lastName } = signupDto;

    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email is already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.usersService.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    const { password: _, ...result } = user;
    return result;
  }

  /**
   * Authenticates a user and returns access and refresh tokens.
   * - Verifies email and password
   * - Stores hashed refresh token in DB
   * @param loginDto DTO with email and password
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.usersService.updateRefreshToken(user.id, hashedRefreshToken);

    return {
      accessToken,
      refreshToken,
    };
  }

  /**
   * Accepts a refresh token and returns a new access token.
   * - Verifies JWT signature and expiration
   * - Matches against stored hash
   * - Returns new access token if valid
   * @param refreshToken Raw token string from client
   */
  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.usersService.findByEmailWithRefreshToken(payload.email);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newToken = this.jwtService.sign(
        { sub: user.id, email: user.email },
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
      );

      return { accessToken: newToken };
    } catch (err) {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
