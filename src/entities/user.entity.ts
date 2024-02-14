import { Document } from 'mongoose';

export interface UserEntity extends Document {
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  createdAt: Date;
}
