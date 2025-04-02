import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * The User entity represents an application user in the database.
 * It maps directly to the 'users' table and contains personal and
 * authentication-related fields.
 */
@Entity()
export class User {
  /**
   * Primary key: Universally unique identifier for the user.
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The user's email address.
   * Must be unique across all users.
   */
  @Column({ unique: true })
  email: string;

  /**
   * The user's hashed password.
   * This field is excluded from query results by default for security.
   */
  @Column({ select: false })
  password: string;

  /**
   * The user's first name.
   */
  @Column()
  firstName: string;

  /**
   * The user's last name.
   */
  @Column()
  lastName: string;

  /**
   * Timestamp of when the user was created.
   * Automatically set by the database.
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp of the last update to the user.
   * Automatically updated by the database.
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
