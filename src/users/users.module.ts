import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }
  ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[MongooseModule]
})
export class UsersModule {}
