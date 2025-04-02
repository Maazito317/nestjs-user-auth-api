import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * JwtAuthGuard protects routes by validating incoming requests
 * using the configured JWT strategy (`jwt.strategy.ts`).
 *
 * Usage: Apply `@UseGuards(JwtAuthGuard)` on any route or controller
 * that should require authentication.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
