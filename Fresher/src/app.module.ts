import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost:27017/nest'), TasksModule],
})
export class AppModule {}