import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dtos/create-cat.dto';

@Injectable()
export class CatsService {
   cats = [{
    id: 1,
    name: 'cat1',
    breed: 'type2',
    age : 9
  }]

  async createCat(createCatDto:CreateCatDto){
    const id = this.cats.length;
    const newCat = {
      ...createCatDto,
      id
    }
    this.cats.push(newCat);
  }

  async findAll(){
    return this.cats;
  }

  async findOne(id){
    this.cats.filter(cat => cat.id == id);
  }
}
