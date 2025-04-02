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
 * AuthController handles HTTP routes related to authentication,
 * including user signup, login, and access to protected profile data.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Route: POST /auth/signup
   * Description: Registers a new user with email, password, and name fields.
   * @param signupDto Validated user registration data
   */
  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  /**
   * Route: POST /auth/login
   * Description: Authenticates a user and returns a signed JWT token.
   * @param loginDto User credentials (email and password)
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Route: GET /auth/profile
   * Description: Protected route that returns the authenticated user's details.
   * Requires a valid JWT token in the Authorization header.
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return req.user;
  }
}
