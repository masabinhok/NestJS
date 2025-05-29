import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/fresher-project'), 
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
    ignoreEnvFile: false, 
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
