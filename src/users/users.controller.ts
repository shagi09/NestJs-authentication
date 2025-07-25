import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/register-user.dto';
import { User } from './schemas/users.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findOne( @Param('id') id: string) {
        return this .usersService.findOne(id)
    }

    @Get()
    findAll(@Query('role') role?: 'editor' | 'user' | 'admin') {
        return this.usersService.findAll(role);;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Post()
    create(@Body() CreateUserDto: CreateUserDto) {
        return this.usersService.create(CreateUserDto)
    }

    @Patch(':id')
    update(@Param('id') id: string,@Body() UpdateUserDto:UpdateUserDto) {
        return this.usersService.update(id,UpdateUserDto)
    }
    
}
