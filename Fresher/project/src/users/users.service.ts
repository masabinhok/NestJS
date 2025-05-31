import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {   User, UserDocument } from './user.schema';
import { SignUpDto } from 'src/auth/dtos/sign-up.dto';
import { Todo } from 'src/todos/schemas/todo.schema';
import { Blog } from 'src/blogs/schemas/blog.schema';

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

  async addTaskToUser(userId: string, taskId: string): Promise<any> {
    const updatedUser = this.userModel.findByIdAndUpdate(userId, {
      $push: { todos: taskId }
    });
    if (!updatedUser) {
      throw new Error(`User with id ${userId} not found`);
    }
    return updatedUser;
  }

  async getAllTodos(userId: string): Promise<Todo[]> {
    const user = await this.userModel.findById(userId).populate('todos').exec();
    if(!user){
      throw new Error(`User with id ${userId} not found`);
    }
    return user.todos;
  }

  async deleteTaskFromUser(userId: string, todoId: string): Promise<UserDocument | null> {
     const user = await this.userModel.findByIdAndUpdate(userId, {
      $pull: { todos: todoId }
    });
    if(!user){
      throw new Error(`User with id ${userId} not found`);
    }
    return user;
  }

  async addBlogToUser(userId: string, blogId: string): Promise<UserDocument | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      $push : { blogs: blogId }
    }, {
      new: true,
    });

    if(!updatedUser){
      throw new Error(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  async getAllBlogs(userId: string): Promise<Blog[] | null> {
    const user = await this.userModel.findById(userId).populate('blogs').exec();

    if(!user){
      throw new Error(`User with id ${userId} not found`);
    }
    return user.blogs;
  }

  async deleteBlogFromUser(userId: string, blogId: string): Promise<UserDocument | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      $pull: { blogs: blogId }
    }, {
      new: true,
    });
    if(!updatedUser){
      throw new Error(`User with id ${userId} not found`);
    }
    return updatedUser;
  }

  async addLikedBlogToUser(userId:string, blogId: string): Promise<UserDocument | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      $push: { likedBlogs: blogId }
    }, {
      new: true,
    });

    if(!updatedUser){
      throw new Error(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  async addLikedCommentToUser(userId: string, commentId: string) : Promise<UserDocument | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      $push: {likedComments: commentId}
    }, {
      new: true,
    });
    if(!updatedUser){
      throw new Error(`User with id ${userId} not found`);
    }

    return updatedUser;
  }

  async addCommentToUser(userId: string, commentId: string): Promise<UserDocument | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(userId, {
      $push: { comments: commentId }
    }, {
      new: true,
    });
    if(!updatedUser){
      throw new Error(`User with id ${userId} not found`);
    }
    return updatedUser;
  }

}
