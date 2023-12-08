import { Injectable, NotFoundException, HttpStatus } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { filterPetDto } from './dto/filter-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './entities/pet.entity';
import * as fs from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { readFileSync } from 'fs';


@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(PetEntity)
    private petRepo: Repository<PetEntity>,
    private userService: UserService
     
) {}
  
  async createPet(pet: CreatePetDto, user) : Promise<PetEntity>{
    const newPet = this.petRepo.create(pet);
    newPet.user = user;
    return await this.petRepo.save(newPet);
  }

  async getAllPets() {
    return await this.petRepo.find();
  }

  async findPetsByUser(userId) {
    const userPets = await this.petRepo.createQueryBuilder('petinfo')
               .leftJoinAndSelect("petinfo.user", "user")
               .where("user.id = :userId", { userId })
               .getMany();
    return this.getPetsWithImgs(userPets)
  }

  async updatePet (id : number , petUpdate : UpdatePetDto, user){
    const oldPet = await this.findPetById(id)
    console.log("oldPet", oldPet)
    if (!oldPet)
    throw new NotFoundException(`Le pet d'id ${id} n'existe pas`)
    if (!this.userService.isOwnerOrAdmin(oldPet, user)) {
      console.log(" you are not the owner")
      throw new UnauthorizedException();
    }
    const newPet = await this.petRepo.preload({
      id,
      ...petUpdate
    })
    return await this.petRepo.save(newPet);
  }


  async deletePet(id: number, user) {
    const petToDelete = await this.findPetById(id);
    if (!this.userService.isOwnerOrAdmin(petToDelete, user)) {
      console.log("not owner")
      throw new UnauthorizedException();
    }
    return await this.petRepo.delete(id);
  }

  async findPetById(id: number ) {
    const pet = await this.petRepo.findOneBy({
        id : id
    })
    if (! pet) {
        throw new NotFoundException(`Le pet d'id ${id} n'existe pas`)
    }
    return pet;
  }

  async countPosts() {
    return await this.petRepo.count();
  }

 /*  async countFilteredPosts (mesQueryParams : filterPetDto) {
    return await this.petRepo.createQueryBuilder("petinfo")
      .where(mesQueryParams.type ? "petinfo.type = :type" : "1=1", {type: mesQueryParams.type})
      .andWhere(mesQueryParams.sex ?"petinfo.sex = :sex" : "1=1", {sex: mesQueryParams.sex})
      .andWhere(mesQueryParams.age ? "petinfo.age = :age" : "1=1", {age: mesQueryParams.age})
      .getCount();
  } */
  
  async paginatedfilteredPets (filteredData : filterPetDto, page: number) {
    console.log("page :" + page)
    console.log(filteredData)
    const where = {};

    if (filteredData.type) {
        where['type'] = filteredData.type;
    }
    if (filteredData.sex) {
        where['sex'] = filteredData.sex;
    }
    if (filteredData.age) {
        where['age'] = filteredData.age;
    }
    console.log(where)
    const filteredPostsCount = await this.petRepo.count({ where });
    console.log(filteredPostsCount)
    const postsPerPage = 3;
    const numberOfPages = Math.ceil(filteredPostsCount/postsPerPage);
    
    const filteredPosts = await this.petRepo.find({
      where,
      skip : postsPerPage * (page - 1),
      take : postsPerPage,
    });
    console.log(filteredPosts)
    const filteredpostsWithImgs = await this.getPetsWithImgs(filteredPosts)

    return { 
      items: filteredpostsWithImgs,
      total: numberOfPages 
    }

  }


  async getAllPetsPaginated(page: number) {
    const queryBuilder = this.petRepo.createQueryBuilder('petinfo');
    queryBuilder.orderBy('petinfo.id', 'ASC');
    const postsPerPage = 3;
    const [items, total] = await queryBuilder.skip((page-1)* postsPerPage)
                                             .take(postsPerPage)
                                             .getManyAndCount();
    const numberOfPages = Math.ceil(total/postsPerPage);  
    const petsWithImgs = await this.getPetsWithImgs(items)
    return { 
      items : petsWithImgs,
      total: numberOfPages
    };

  }
  async getPetsWithImgs(items: PetEntity[]) {
    return await Promise.all(items.map(async (pet) =>{
      const petImageFile = await this.getImage(pet.imageRef)
      delete pet.imageRef;
      return {
        ...pet,
        petImageFile
      }
    }))
  }

  async getImage(imagename: string){
    try {
      const file = join(process.cwd(), './uploads/' + imagename);
      const data = readFileSync(file);
      const base64 = data.toString('base64');
      return base64;
    } catch (error) {
      return null;
    }
  }

}


