import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {   UserDocument } from './user.schema';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async findByUsername(username: string) : Promise<UserDocument | null> {
    return this.userModel.findOne({username}).exec();
  }

  async createUser(signUpDto: SignUpDto): Promise<UserDocument> {
      const newUser = new this.userModel(signUpDto);
      return newUser.save();
  }


}
