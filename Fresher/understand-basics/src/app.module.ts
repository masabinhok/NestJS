import { Module } from "@nestjs/common";
import { CatsModule } from "./cats/cats.module";
import { MongooseModule } from "@nestjs/mongoose";
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";

@Module({
  imports: [CatsModule, MongooseModule.forRoot('mongodb://localhost:27017/nest'), TasksModule, AuthModule, UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController]
})
export class AppModule {}


