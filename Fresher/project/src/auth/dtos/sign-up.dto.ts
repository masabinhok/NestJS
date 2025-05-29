import { IsEmail, IsString } from "class-validator";

export class SignUpDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEmail()
  email: string; // Optional, in case you want to allow sign-in with email as well
}