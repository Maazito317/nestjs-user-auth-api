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
 * UsersController handles all user-related HTTP routes under /users.
 * All routes are protected by JWT authentication via JwtAuthGuard.
 */
@Controller('users')
@UseGuards(JwtAuthGuard) // Apply JWT auth guard to all routes in this controller
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Route: GET /users
   * Description: Retrieves a list of all users (passwords excluded).
   */
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  /**
   * Route: GET /users/:id
   * Description: Fetches a specific user by their ID.
   * @param id UUID of the user
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Route: PUT /users/:id
   * Description: Updates user details such as first name, last name, or email.
   * @param id UUID of the user to update
   * @param updateUserDto Validated update fields
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * Route: DELETE /users/:id
   * Description: Deletes a user from the system by ID.
   * @param id UUID of the user to delete
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
    return { message: 'User deleted successfully' };
  }
}
