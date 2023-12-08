import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { PetEntity } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PetEntity]), UserModule],
  controllers: [PetsController],
  providers: [PetsService]
})
export class PetsModule {}
