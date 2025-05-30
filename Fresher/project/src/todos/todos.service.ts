import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TodoDocument } from './schemas/todo.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from 'src/users/user.schema';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private todoModel: Model<TodoDocument>,
    @InjectModel('User') private userModel: Model<UserDocument>,
){}

  async createTask(userId: string, createTaskDto: CreateTaskDto): Promise<TodoDocument> {
    const newTask = new this.todoModel({
      ...createTaskDto, 
      user: userId,
    });

    const savedTask = await newTask.save();

    await this.userModel.findByIdAndUpdate(userId, {
      $push: { todos: savedTask._id },
    });

    return savedTask;
  }

  async getTasksByUserId(userId: string): Promise<any[]> {
    const user = await this.userModel.findById(userId).populate('todos');
    if(!user){
      throw new Error('User not found');
    }
    console.log(user.todos);
    return user.todos;
  }

  async updateTask( taskId: string, updateTaskDto: UpdateTaskDto ): Promise<TodoDocument> {
    const updatedTask = await this.todoModel.findByIdAndUpdate(taskId, updateTaskDto, {
      new: true,
      runValidators: true,
    })
    if(!updatedTask){
      throw new Error(`Task with id ${taskId} not found`);
    }
    return updatedTask;
  }

  async deleteTask(userId: string, taskId: string): Promise<TodoDocument> {
    const deletedTask  = await this.todoModel.findByIdAndDelete(taskId);
    if(!deletedTask){
      throw new Error(`Task with id ${taskId} not found`);
    }
    await this.userModel.findByIdAndUpdate(userId, {
     $pull: {todos: taskId},
    })
    return deletedTask;
  }
}
