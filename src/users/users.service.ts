import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';

/**
 * UsersService encapsulates all business logic for user-related database operations.
 * Includes creation, lookup, updating, and deletion of users.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Creates a new user and saves them to the database.
   * @param userData Partial user object (usually from signup)
   * @returns The full user entity
   */
  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  /**
   * Finds a user by their email.
   * Used during signup to check for duplicates.
   * @param email User's email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }

  /**
   * Finds a user by email with password included.
   * Used only during login to validate credentials.
   * @param email User's email
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  /**
   * Finds a user by email and includes refresh token.
   * Used during refresh token validation.
   * @param email User's email
   */
  async findByEmailWithRefreshToken(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'refreshToken'],
    });
  }

  /**
   * Retrieves all users from the database.
   * Excludes the password from each result.
   */
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  /**
   * Finds a single user by ID.
   * Excludes password from returned result.
   * @param id UUID of the user
   */
  async findOne(id: string): Promise<Partial<User>> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...rest } = user;
    return rest;
  }

  /**
   * Updates a user's profile fields.
   * @param id UUID of the user
   * @param updateUserDto Fields to update
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id });

    if (!updatedUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const { password, ...result } = updatedUser;
    return result;
  }

  /**
   * Deletes a user by ID.
   * @param id UUID of the user
   */
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }

  /**
   * Updates a user's refresh token (hashed).
   * Called during login or token rotation.
   * @param userId UUID of the user
   * @param token hashed refresh token
   */
  async updateRefreshToken(userId: string, token: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken: token });
  }
}
