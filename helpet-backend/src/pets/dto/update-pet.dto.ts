import { PartialType } from '@nestjs/mapped-types';
import { CreatePetDto } from './create-pet.dto';
import { IsIn, MaxLength, ValidationArguments } from 'class-validator';

export class UpdatePetDto extends PartialType(CreatePetDto) {
    name: string;

    type: string;

    breed: string;

    @IsIn(["male", "female"])
    sex: string;

    @MaxLength(360,{
        message: (validationData: ValidationArguments) => {
            return `la taille minimale de ${validationData.property} est ${validationData.constraints[0]}`
        }
    })
    age: number;

    imageRef: string;
}
