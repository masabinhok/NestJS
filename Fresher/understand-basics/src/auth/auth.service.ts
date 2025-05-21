import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto): Promise<{access_token: string}>{
    const {username, password: pass} = signInDto;
    const user = await this.usersService.findOne(username);

    if(!user){
      throw new UnauthorizedException('User not found');
    }

    if(user && user.password !== pass){
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = {
      sub: user.userId, username: user.username
    }

    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}
