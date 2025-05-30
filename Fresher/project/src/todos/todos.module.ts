import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/user.schema';


@Module({
  imports: [ MongooseModule.forFeature([{
    name: Todo.name, schema: TodoSchema,
  }, {
    name: User.name, schema: UserSchema, // Assuming User schema is also needed here
  }])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
