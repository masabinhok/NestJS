import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dtos/sign-up.dto';
import { LoginDto } from './dtos/login-dto';
import {  UserDocument } from 'src/users/user.schema';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService){}

  async signUp(signUpDto: SignUpDto) :Promise<UserDocument> {
    const {username, email, password} = signUpDto;
    const existingUser = await this.usersService.findByUsername(username);

    if(existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = {
      email, username, password: hashedPassword
    }

    return this.usersService.createUser(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: Promise<string> }> {
    const {username, password} = loginDto;
    const user = await this.usersService.findByUsername(username);

    if(!user){
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
      throw new Error('Invalid password');
    }

    const payload = {
      sub: user._id, username: user.username 
    }

    return {
      access_token: this.jwtService.signAsync(payload),
    }
  }

  async hashPassword(plain: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(plain, salt);
  }
}
