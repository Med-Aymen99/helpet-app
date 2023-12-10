import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe, Query, UseGuards, Req, UseInterceptors, DefaultValuePipe, HttpStatus } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetEntity } from './entities/pet.entity';
import { filterPetDto } from './dto/filter-pet.dto';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Res, UploadedFile } from '@nestjs/common/decorators';
import { diskStorage } from 'multer';
import { editFileName } from 'src/common/editFileName';
import { Response, response } from 'express';
import { Observable, of } from 'rxjs';
import { join } from 'path';
import { readFileSync } from 'fs';

@Controller('/api/pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('imageFile', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName
    })
  }))
  @UseGuards(JwtAuthGuard)
  async createPet(
    @Body() newPet: CreatePetDto,
    @UploadedFile() imageFile : Express.Multer.File,
    @User() user
  ) : Promise<PetEntity> {
    if (imageFile){
      console.log("ok")
      newPet.imageRef=imageFile.filename;
    } else {newPet.imageRef=""}
    return await this.petsService.createPet(newPet, user);
  }


  @Put('update/:id')
  @UseInterceptors(FileInterceptor('imageFile', {
    storage: diskStorage({
      destination: './uploads',
      filename: editFileName
    })
  }))
  @UseGuards(JwtAuthGuard)
  async updatePet(
    @Param('id', ParseIntPipe) id : number,
    @Body() newPet: UpdatePetDto,
    @User() user,
    @UploadedFile() imageFile : Express.Multer.File,
  ) {
    console.log("authorized !!")
    console.log("imageFile", imageFile)
    if (imageFile){
      console.log("ok")
      newPet.imageRef=imageFile.filename;
    } else {
      newPet.imageRef=""
    }
    return await this.petsService.updatePet(id, newPet, user);
  }

  @Get('petList')
  async getAllPets(
  ) : Promise<PetEntity[]> {
    return await this.petsService.getAllPets();
  }

  @Get('myProfile')
  @UseGuards(JwtAuthGuard)
  async getMyPets(
    @User() user
  ) : Promise<PetEntity[]> {
    console.log(user)
    return await this.petsService.findPetsByUser(user.id);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deletePet(
      @Param('id', ParseIntPipe) id : number,
      @User() user
  ) {
      return this.petsService.deletePet(id, user);
  }
  @Get('postsCount')
  async countPosts() {
    return await this.petsService.countPosts();
  }

  @Get('Paginatedfilter')
  async PaginatedfilteredPets(
    @Query('data') filteredData : filterPetDto,
    @Query('page', new DefaultValuePipe (1), ParseIntPipe) page:number
  ) {
  
    return await this.petsService.paginatedfilteredPets(filteredData, page);
  }

  @Get('petListPages')
  async getPetsPages(
    @Query('page', new DefaultValuePipe (1), ParseIntPipe) page:number ,
  ) {
    const obj = await this.petsService.getAllPetsPaginated(page);
    //console.log("obj :", obj)
    return obj;
  }


  /* @Get('petImg/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res): Observable<object> {
      const img = of(res.sendFile(join(process.cwd(), './uploads/' + imagename)));
      console.log(img)
      return img
  } */

}
