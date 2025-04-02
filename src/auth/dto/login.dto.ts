import { IsEmail, MinLength } from 'class-validator';

/**
 * LoginDto defines the expected structure and validation rules
 * for user login requests (POST /auth/login).
 */
export class LoginDto {
  /**
   * Must be a valid email address.
   */
  @IsEmail()
  email: string;

  /**
   * Password must be at least 8 characters long.
   */
  @MinLength(8)
  password: string;
}
