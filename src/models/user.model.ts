import { model, Schema } from 'mongoose';
import { UserEntity } from '../entities/user.entity';
import * as argon from 'argon2';

const userSchema: Schema<UserEntity> = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

userSchema.pre(
  'save',
  async function (this: UserEntity, next): Promise<void> {
    if (!this.isModified('password')) return next();

    try {
      this.password = await argon.hash(this.password.toString());
      this.createdAt = new Date();
      next();
    } catch (error) {
      console.error(`[ERROR] ${error}`);
      return next(error);
    }
  },
);

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
