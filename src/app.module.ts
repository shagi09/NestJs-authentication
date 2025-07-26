import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config'; // Import ConfigModule for environment variables

@Module({
  imports: [
    ConfigModule.forRoot({  // Load .env file
      isGlobal: true,       // Make available globally
      envFilePath: '.env',  // Explicit path
    }),
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    AuthModule,], // replace with your MongoDB URI],
})
export class AppModule {}
