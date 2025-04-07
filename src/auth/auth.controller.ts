import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

/**
 * AuthController handles all authentication-related routes,
 * including signup, login, profile access, and token refresh.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * POST /auth/signup
   * Registers a new user account.
   * Validates and creates the user using AuthService.
   * @param signupDto DTO with email, password, first/last name
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * POST /auth/login
   * Authenticates a user and returns access and refresh tokens.
   * @param loginDto DTO with email and password
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * GET /auth/profile
   * Returns the profile information of the currently authenticated user.
   * Protected route using JWT guard.
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }

  /**
   * POST /auth/refresh
   * Accepts a refresh token and returns a new access token if valid.
   * @param refreshToken string passed in body
   */
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }
}
