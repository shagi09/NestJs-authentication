import { CreateUserDto } from "./create-user.dto"
//import {partialType} from "@nestjs/mapped-types"

export class UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user' | 'editor';

}