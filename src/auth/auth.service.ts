import { BadRequestException, Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async signup(signupDto: SignupDto) {
        const { email, password, firstName, lastName } = signupDto;
        
        // Check if email already exists
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new BadRequestException('Email is already registered');
        }
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a user entity instance
        const user = this.userRepository.create({
            email,
            password: hashedPassword,
            firstName,
            lastName,
        });

        // Save to the database
        const savedUser = await this.userRepository.save(user);

        // Return response (omit password)
        const { password: _, ...result } = savedUser;
        return result;
    }

    async login(loginDto: LoginDto){
        const { email, password } = loginDto;

        // Check if email already exists
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new BadRequestException('Invalid Credentials');
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new BadRequestException('Invalid credentials');
        }
        
        // Generate JWT
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return {
            accessToken: token,
        };
    }
}