import { IsInt, IsString } from "class-validator";
import { z } from "zod";

export const createCatSchema = z.object({
  name: z.string(),
  age: z.number(),
  breed: z.string(),
}).required();


export class CreateCatDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}


