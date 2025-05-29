import {Schema, Prop,SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose';

@Schema()
export class User {
  @Prop({required: true, unique: true})
  username: string;

  @Prop({required: true, unique: true})
  email: string;

  @Prop({required: true})
  password: string;

  @Prop([{type: Types.ObjectId, ref: 'Todo', default: []}])
  todos: Types.ObjectId[];

  @Prop([{type: Types.ObjectId, ref: 'Blog', default: []}])
  blogs: Types.ObjectId[];

}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;