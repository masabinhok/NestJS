import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

@Schema()
export class Task {
  @Prop({required: true})
  task: string;

  @Prop({default: false})
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

export type TaskDocument = HydratedDocument<Task>;
