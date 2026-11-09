import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard, Roles, RolesGuard } from './guards';
import { Role } from '../generated/prisma/client';

class LoginDto { @IsEmail() email: string; @IsString() password: string; }
class RegisterDto { @IsEmail() email: string; @MinLength(8) password: string; @IsEnum(Role) role: Role; }

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}
  @Post('login') login(@Body() d: LoginDto) { return this.auth.login(d.email, d.password); }

  @ApiBearerAuth() @UseGuards(JwtAuthGuard, RolesGuard) @Roles('ADMIN')
  @Post('register') register(@Body() d: RegisterDto) { return this.auth.register(d.email, d.password, d.role); }
}
