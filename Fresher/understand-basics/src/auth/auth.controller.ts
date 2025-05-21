import { Body, Controller, HttpCode, HttpStatus, Post, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Request as ExpressRequest } from 'express';
import { Public } from './decorators/public.decorators';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    id: string;
    email: string;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService){}
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto ) {
    return this.authService.signIn(signInDto);
  }

  @Get('profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }

  @Public()
  @Get('public')
  findAll() {
    return { message: 'This is a public endpoint' };
  }
}
