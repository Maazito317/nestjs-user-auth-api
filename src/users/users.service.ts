import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UpdateUserDto } from './update-user.dto';

/**
 * UsersService handles all user-related database operations,
 * including listing, retrieving, updating, and deleting users.
 */
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Retrieves all users from the database.
   * Passwords are removed before returning results.
   * @returns Array of users without password field
   */
  async findAll(): Promise<Partial<User>[]> {
    const users = await this.userRepository.find();
    return users.map(({ password, ...rest }) => rest);
  }

  /**
   * Retrieves a single user by their unique ID.
   * @param id The UUID of the user
   * @returns The user without password field
   * @throws NotFoundException if user is not found
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
   * Updates a user's details using a partial update DTO.
   * @param id The UUID of the user
   * @param updateUserDto Fields to update (email, firstName, lastName)
   * @returns The updated user without password field
   * @throws NotFoundException if user does not exist
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
   * Deletes a user from the database.
   * @param id The UUID of the user
   * @throws NotFoundException if no record was deleted
   */
  async remove(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
