import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRole = 'admin' | 'editor' | 'user';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ nullable: true })
  avatar: string;

  @Prop({ default: false })
  isGoogleAuth: boolean;



}

export const UserSchema = SchemaFactory.createForClass(User);