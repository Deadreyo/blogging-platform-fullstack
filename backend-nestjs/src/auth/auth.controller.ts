import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    signIn(@Body() body: SignInDto) {
        const { email, password } = body;
        return this.authService.signIn(email, password);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() body: CreateUserDto) {
        return this.authService.signUp(body);
    }
}
