import { Injectable,NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async create(userData: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(userData);
    return createdUser.save();
  }
    

  async findAll(role?: 'admin' | 'editor' | 'user'): Promise<User[]> {
     if (role){
      return this.userModel.find({ role}).exec();
     }
     return this.userModel.find().exec();

  }


  async findOne(id: string): Promise<User> {
    const user= await this.userModel.findById(id).exec()
    if(!user){
      throw new NotFoundException('user with id'+id+"not found")
    }

    return user;
  }

  async update(id:string, updateData: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, updateData, {
      new: true}).exec();
    }

async delete(id: string): Promise<User | null> {
  return this.userModel.findByIdAndDelete(id).exec();
}
    
}
