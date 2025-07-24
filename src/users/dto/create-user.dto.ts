import { IsEmail,IsNotEmpty,  IsString, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEnum(['admin', 'user', 'editor'])
  role: 'admin' | 'user' | 'editor';
}