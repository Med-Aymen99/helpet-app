import { IsEmail, IsNotEmpty } from "class-validator";

 
 export class UserRegisterDto {

    @IsNotEmpty()
    username: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    password: string
 }