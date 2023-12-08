import { IsIn } from "class-validator";

export class CreatePetDto {
    name: string;

    type: string;

    breed: string;
    
    @IsIn(["male", "female"])
    sex: string;

    age: number;

    imageRef: string;
}