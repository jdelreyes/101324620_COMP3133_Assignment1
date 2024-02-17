import { model, Schema } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import * as argon from 'argon2';

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
    required: true,
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

userSchema.pre(
  'findOneAndUpdate',
  async function (this: { _update: UserEntity }, next): Promise<void> {
    if (!this._update || !this._update.password) return next();

    try {
      this._update.password = await argon.hash(
        this._update.password.toString(),
      );
      next();
    } catch (error) {
      console.error(`[ERROR] ${error}`);
      return next(error);
    }
  },
);

const UserModel = model<UserEntity>('UserModel', userSchema);

export default UserModel;
