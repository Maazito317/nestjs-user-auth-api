import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

/**
 * UsersModule is responsible for all user-related functionality,
 * including fetching, updating, and deleting user data.
 *
 * This module registers:
 * - User entity with TypeORM
 * - UsersService for business logic
 * - UsersController for HTTP route handling
 */
@Module({
  // Registers the User entity with TypeORM in this module's scope
  imports: [TypeOrmModule.forFeature([User])],

  // Provides the user-related service
  providers: [UsersService],

  // Exposes user-related endpoints
  controllers: [UsersController],

  // Makes UsersService available to other modules (e.g., AuthModule)
  exports: [UsersService],
})
export class UsersModule {}
