import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users/schemas/users.schema';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        
        private readonly jwtService: JwtService
    ){}

    async register(createUserDto: CreateUserDto): Promise<{user: User, token: string}> {
        const existingUser = await this.userModel.findOne({ email: createUserDto.email });
        if(existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        const newUser=await this.userModel.create({
            ...createUserDto,
            password: hashedPassword
        })
        const token = this.generateToken(newUser);
        return { user: newUser, token };


        

        }

        async login(loginUserDto: LoginUserDto): Promise<{user: User, token: string}> {
        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if(!user){
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if(!isPasswordValid) {
            throw new Error('password is incorrect');
        }
        const token = this.generateToken(user);
        return {user, token}

    }

    async googlelogin(req){
        if(!req.user) {
            throw new Error('No user from google');
        }
        const {email, name, avatar}=req.user
        let user=await this.userModel.findOne(email)
        if(!user) {
            user = await this.userModel.create({
                email: req.user.email,
                name: req.user.name,
                avatar: req.user.avatar,
                isGoogleAuth: true,
            });
        }
        const token = this.generateToken(user);
        return { user, token };

}
          private generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email,
      role: user.role 
    };
    return this.jwtService.sign(payload);
  }
}

