import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(':id')
    findOne( @Param('id',ParseIntPipe) id: number) {
        return this .usersService.findOne(id)
    }

    @Get()
    findAll(@Query('role') role?: 'editor' | 'user' | 'admin') {
        return this.usersService.findAll(role);;
    }

    @Delete(':id')
    remove(@Param('id',ParseIntPipe) id: number) {
        return this.usersService.delete(id);
    }

    @Post()
    create(@Body() user: CreateUserDto) {
        return this.usersService.create(user)
    }

    @Patch(':id')
    update(@Param('id',ParseIntPipe) id: number,@Body() updateData:UpdateUserDto) {
        return this.usersService.update(id,updateData)
    }
    
}
