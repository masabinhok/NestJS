import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {  Task, TaskDocument } from './schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import {Task as TaskInterface} from './interfaces/task.interface';
import { UpdateTaskDto } from './dtos/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>){}
  
  //create a task
  async create(createTaskDto: CreateTaskDto): Promise<TaskInterface> {
   
    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }


  //read all tasks
  async findAll(): Promise<TaskInterface[]> {
    return this.taskModel.find().exec();
  }


  //update a task
  async updateOne(id: string, updateTaskDto: UpdateTaskDto) : Promise<TaskInterface> {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {
      new: true,
      runValidators: true,
    })
    if(!updatedTask){
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return updatedTask;
  }


  //delete a task
  async deleteOne(id: string): Promise<TaskInterface>{
      const deletedTask = await this.taskModel.findByIdAndDelete(id);
      if(!deletedTask){
        throw new NotFoundException(`Task with id ${id} not found`);
      }
      return deletedTask;
  }
}
