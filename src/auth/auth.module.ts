import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { User } from '../users/user.entity';

/**
 * AuthModule handles all authentication-related logic,
 * including signup, login, JWT strategy registration, and protected route access.
 */
@Module({
  imports: [
    // Registers the User entity with TypeORM in this module's scope
    TypeOrmModule.forFeature([User]),

    // Registers JWT module with secret and expiration from environment
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  // Exposes controller to handle auth routes (e.g., /auth/signup, /auth/login)
  controllers: [AuthController],

  // Registers AuthService for business logic and JwtStrategy for token validation
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
