import{ IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @MinLength(8)
    @IsNotEmpty()
    password: string;
    
  @IsString()
  @IsOptional()
  avatar?: string;
}