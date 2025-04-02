import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

/**
 * SignupDto defines the structure and validation rules
 * for incoming user registration requests (POST /auth/signup).
 */
export class SignupDto {
  /**
   * Must be a valid email format.
   */
  @IsEmail()
  email: string;

  /**
   * Password must be at least 8 characters long.
   */
  @MinLength(8)
  password: string;

  /**
   * First name cannot be empty.
   */
  @IsNotEmpty()
  firstName: string;

  /**
   * Last name cannot be empty.
   */
  @IsNotEmpty()
  lastName: string;
}
