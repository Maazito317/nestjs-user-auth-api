import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

/**
 * AuthModule sets up all authentication-related providers and dependencies.
 * - Imports User entity and JwtModule
 * - Provides AuthService and JwtStrategy
 * - Exposes AuthController to handle incoming requests
 */
@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // for repository access if needed internally
    JwtModule.register({
      secret: process.env.JWT_SECRET, // secret used to sign JWTs
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
    UsersModule, // Import UsersService to delegate user logic
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
