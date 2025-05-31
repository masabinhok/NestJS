import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Blog } from 'src/blogs/schemas/blog.schema';
import { Todo } from 'src/todos/schemas/todo.schema';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }],
    default: [],
  })
  todos: Todo[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    default: [],
  })
  blogs: Blog[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  comments: Comment[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
    default: [],
  })
  likedBlogs: Blog[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    default: [],
  })
  likedComments: Comment[];
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
