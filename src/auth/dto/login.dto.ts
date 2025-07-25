import { IsNotEmpty,IsString, MinLength } from "class-validator";
export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    password: string;


}