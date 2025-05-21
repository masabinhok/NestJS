import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Cat, CatDocument } from "./schemas/cat.schema";
import { Model } from "mongoose";
import { CreateCatDto } from "./dtos/create-cat.dto";
import { UpdateCatDto } from "./dtos/update-cat.dto";


@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>){}

  async create(createCatDto: CreateCatDto): Promise<Cat>{
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[]>{
    return this.catModel.find().exec();
  }

  async updateOne(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updatedCat = await this.catModel.findByIdAndUpdate(id, updateCatDto, {
      new: true, 
      runValidators: true,
    });

    if(!updatedCat){
      throw new NotFoundException(`Cat with id ${id} not found`);
    }

    return updatedCat;
  }
}