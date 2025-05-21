import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCatDto } from "./dtos/create-cat.dto";
import { UpdateCatDto } from "./dtos/update-cat.dto";
import { CatsService } from "./cats.service";
import { Cat } from "./interfaces/cat.interface";

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService){}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
     this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
   return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns a #${id} cat`;  
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto ): string {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes a #${id} cat`;  
  }

}