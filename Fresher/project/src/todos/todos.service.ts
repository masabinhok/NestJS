import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { TodoDocument } from './schemas/todo.schema';
import { CreateTaskDto } from './dtos/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectModel('Todo') private todoModel: Model<TodoDocument>,
    private usersService: UsersService,
  ) {}

  async createTask(
    userId: string,
    createTaskDto: CreateTaskDto,
  ): Promise<TodoDocument> {
    const newTask = new this.todoModel({
      ...createTaskDto,
      user: userId,
    });

    const savedTask = await newTask.save();
    if (!savedTask) {
      throw new Error('Task could not be created');
    }

    await this.usersService.addTaskToUser(userId, savedTask._id as string);

    return savedTask;
  }

  async getTasksByUserId(userId: string): Promise<any[]> {
    return this.usersService.getAllTodos(userId);
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TodoDocument> {
    const updatedTask = await this.todoModel.findByIdAndUpdate(
      taskId,
      updateTaskDto,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedTask) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    return updatedTask;
  }

  async deleteTask(userId: string, taskId: string): Promise<TodoDocument> {
    const deletedTask = await this.todoModel.findByIdAndDelete(taskId);
    if (!deletedTask) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    await this.usersService.deleteTaskFromUser(userId, taskId);
    return deletedTask;
  }
}
