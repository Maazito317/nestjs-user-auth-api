import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

// Load environment variables from .env file at startup
dotenv.config();

/**
 * TypeORM configuration object for PostgreSQL connection.
 * This is used to set up and initialize the database connection.
 */
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  /**
   * Database connection details loaded from environment variables.
   */
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,

  /**
   * Automatically load all entities (classes decorated with @Entity)
   * so you don't need to explicitly import them into the TypeOrmModule.
   *
   * An entity class is a TypeScript class that maps to a database table.
   * Example: User entity maps to a 'users' table.
   */
  autoLoadEntities: true,

  /**
   * Auto-synchronize the database schema with your entity classes.
   * This is convenient for development, but should be disabled in production
   * to avoid accidental data loss or schema drift.
   */
  synchronize: true,
};
