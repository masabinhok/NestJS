import { IsBoolean, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task: string;
}
