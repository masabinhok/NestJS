import { IsBoolean, IsString, Min } from "class-validator";

export class CreateTaskDto {
  @IsString()
  task: string;

  @IsBoolean()
  completed: boolean;
}