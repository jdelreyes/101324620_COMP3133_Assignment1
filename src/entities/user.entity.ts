import { Document } from 'mongoose';

export interface UserEntity extends Document {
  userName: string;
  password: string;
  email: string;
}
