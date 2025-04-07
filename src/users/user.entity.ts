import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User entity maps to the 'user' table in the database.
 * Each field is automatically mapped to a column.
 */
@Entity()
export class User {
  /** Unique identifier (UUID) for each user */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Unique email address for login and identity */
  @Column({ unique: true })
  email: string;

  /**
   * Hashed password. Excluded by default from query results.
   * Use select: ['password'] in queries when needed.
   */
  @Column({ select: false })
  password: string;

  /** First name of the user */
  @Column()
  firstName: string;

  /** Last name of the user */
  @Column()
  lastName: string;

  /**
   * Hashed refresh token for issuing new access tokens.
   * Optional and excluded from query results unless explicitly selected.
   */
  @Column({ nullable: true, select: false })
  refreshToken: string | null;

  /** Timestamp when the user was created */
  @CreateDateColumn()
  createdAt: Date;

  /** Timestamp when the user was last updated */
  @UpdateDateColumn()
  updatedAt: Date;
}
