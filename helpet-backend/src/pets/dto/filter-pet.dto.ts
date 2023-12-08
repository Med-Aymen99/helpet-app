import { IsIn, IsOptional } from "class-validator";

export class filterPetDto {
    @IsOptional()
    @IsIn(["dog", "cat", "rabbit", "mouse", "other"])
    type: string;

    @IsOptional()
    @IsIn(["male", "female"])
    sex: string;
    
    @IsOptional()
    age: number;
}