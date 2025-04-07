import {
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from './update-user.dto';

/**
 * Handles all HTTP requests related to user management.
 * All routes are protected using JWT authentication.
 */
@Controller('users')
@UseGuards(JwtAuthGuard) // Protect all routes with JWT guard
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * GET /users
   * Fetch a list of all users (excluding passwords).
   */
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * GET /users/:id
   * Fetch details for a single user by ID.
   * @param id UUID of the user
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * PUT /users/:id
   * Update an existing user's information.
   * @param id UUID of the user
   * @param updateUserDto Object containing fields to update
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * DELETE /users/:id
   * Remove a user from the system.
   * @param id UUID of the user
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
