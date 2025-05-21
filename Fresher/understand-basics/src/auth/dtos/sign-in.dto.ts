import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}