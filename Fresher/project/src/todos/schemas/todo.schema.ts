import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as mongoose from "mongoose";
import { User } from "src/users/user.schema";
@Schema()
export class Todo {

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  user: User;

  @Prop({ required: true })
  task: string;

  @Prop({ required: true, default: false })
  completed: boolean;
}
export const TodoSchema = SchemaFactory.createForClass(Todo);
export type TodoDocument = Todo & Document;