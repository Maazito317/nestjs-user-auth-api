import { IsEmail, IsOptional, IsNotEmpty } from 'class-validator';

/**
 * UpdateUserDto defines the structure and validation rules
 * for updating user fields via PUT /users/:id.
 * 
 * All fields are optional, allowing partial updates.
 */
export class UpdateUserDto {
  /**
   * Optional. Must be a valid email address if provided.
   */
  @IsOptional()
  @IsEmail()
  email?: string;

  /**
   * Optional. Must be non-empty if provided.
   */
  @IsOptional()
  @IsNotEmpty()
  firstName?: string;

  /**
   * Optional. Must be non-empty if provided.
   */
  @IsOptional()
  @IsNotEmpty()
  lastName?: string;
}
