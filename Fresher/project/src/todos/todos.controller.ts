import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Request } from 'express';
import { UpdateTaskDto } from './dtos/update-task.dto';


@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  async createTask(@Req() request: Request, @Body() createTaskDto: any) {
    const user = request['user'];
    return this.todosService.createTask(user.sub, createTaskDto);
  }

  @Get()
  async getTasksByUserId(@Req() request: Request){
    const user = request['user'];
    return this.todosService.getTasksByUserId(user.sub);
  }

  @Put(':taskId')
  async updateTask(@Param('taskId') taskId: string, @Body() updateTaskDto: UpdateTaskDto){
    return this.todosService.updateTask(taskId, updateTaskDto);
  }

  @Delete(':taskId')
  async deleteTask(@Req() request: Request, @Param('taskId') taskId: string){
    const user = request['user'];
    return this.todosService.deleteTask(user.sub, taskId);
  }
}
