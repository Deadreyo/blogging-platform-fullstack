import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {

    constructor(private userService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string) {
        const user = await this.userService.findOne(email);
        if (!user) {
            throw new UnauthorizedException('User not found')
        }

        const isCorrect = await bcrypt.compare(pass, user.password);
        if (!isCorrect) {
            throw new UnauthorizedException('Wrong password');
        }
        
        const token = await this.jwtService.signAsync({ id: user._id, email: user.email });
        
        return {
            token,
        };
    }

    async signUp({ name, email, password }: CreateUserDto) {
        const user = await this.userService.findOne(email);
        if (user) {
            throw new UnauthorizedException('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const newUser = await this.userService.create({
            name,
            email,
            password: hashedPassword,
        });

        const token = await this.jwtService.signAsync({ id: newUser._id, email: newUser.email });
        
        return {
            token,
        };
    }
}
