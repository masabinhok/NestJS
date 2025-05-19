import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class UpdateCatDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(30)
  age?: number;

  @IsOptional()
  @IsString()
  breed?: string;
}