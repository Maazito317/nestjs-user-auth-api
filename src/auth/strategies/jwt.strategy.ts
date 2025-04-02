import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

/**
 * JwtStrategy configures how incoming JWT tokens are validated.
 * This is used by NestJS Guards (e.g. JwtAuthGuard) to authorize requests.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extracts JWT from Authorization header as a Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Automatically rejects expired tokens
      ignoreExpiration: false,
      // Uses the secret defined in .env to validate token signature
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Validates the JWT payload and attaches data to the request object
   * as `req.user` for use in protected routes.
   *
   * @param payload The decoded JWT payload (automatically provided by Passport)
   * @returns An object that becomes available as `req.user`
   */
  async validate(payload: any) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
