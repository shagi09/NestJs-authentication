import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}
    @Post('Register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('Login')
    async login(@Body() loginUserDto: LoginUserDto) {
        return this.authService.login(loginUserDto);
    }

      @Get('google')
    @UseGuards(AuthGuard('google'))
    googleAuth() {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }

}


