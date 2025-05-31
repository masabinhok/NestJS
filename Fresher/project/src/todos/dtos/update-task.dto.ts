import { IsBoolean } from 'class-validator';

export class UpdateTaskDto {
  @IsBoolean()
  completed: boolean; // Optional, to allow toggling the completion status
}
