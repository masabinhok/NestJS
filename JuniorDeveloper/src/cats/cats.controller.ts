import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { CatsService } from './cats.service';
import { RoleGuard } from 'src/role.guard';
import { Roles } from 'src/roles.decorator';
import { CreateCatDto } from './dtos/create-cat.dto';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { TimeoutError } from 'rxjs';



@Controller('cats')
@UseGuards(RoleGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles('admin, user')
  async create(@Body() createCatDto: CreateCatDto){

    this.catsService.createCat(createCatDto);
  }

  @UseInterceptors(LoggingInterceptor, TransformInterceptor, ErrorsInterceptor, CacheInterceptor, TimeoutError)
  @Get()
  async findAll(){
    return this.catsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number){
    this.catsService.findOne(id);
  }
}
