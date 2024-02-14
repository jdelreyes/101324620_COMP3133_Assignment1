import { UserEntity } from '../entities/user.entity';
import UserModel from '../models/user.model';
import * as argon from 'argon2';
import jwt from 'jsonwebtoken';

async function register(userName: string, password: string, email: string) {
  try {
    const newUser: UserEntity = new UserModel({
      userName,
      password,
      email,
    });

    await newUser.save();

    return newUser;
  } catch (error) {
    console.error('[ERROR]:', error);
    return null;
  }
}

async function login(userName: string, password: string) {
  try {
    const user = await UserModel.findOne({ userName });
    if (!user) return null;

    const passwordMatches = await argon.verify(
      user.password.toString(),
      password,
    );
    if (!passwordMatches) return null;

    const access_token: string = jwt.sign({ userName }, process.env.JWT_TOKEN, {
      expiresIn: '48h',
    });

    return access_token;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const AuthService = { register, login };
