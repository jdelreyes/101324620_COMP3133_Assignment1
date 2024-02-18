import { model, Schema } from 'mongoose';
import { UserEntity } from '../entities';

const userSchema: Schema<UserEntity> = new Schema({
  userName: {
    type: String,
    required: [true, 'userName is required'],
    unique: true,
    validate: {
      validator: (username: string) => {
        return username.length >= 4;
      },
      message: 'Invalid username',
    },
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    validate: {
      validator: (password: string) => {
        return password.length >= 8;
      },
      message: 'Invalid password',
    },
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    validate: {
      validator: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email address',
    },
  },
});

const UserModel = model<UserEntity>('UserModel', userSchema);

export default UserModel;
