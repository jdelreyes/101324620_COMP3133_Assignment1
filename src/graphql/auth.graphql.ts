import { extendType, objectType, nonNull, stringArg, idArg } from 'nexus';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { NexusGenObjects } from '../../nexus-typegen';
import {
  NexusExtendTypeDef,
  NexusObjectTypeDef,
  ObjectDefinitionBlock,
} from 'nexus/dist/core';
import { UserEntity } from '../entities';

export const Auth: NexusObjectTypeDef<'Auth'> = objectType({
  name: 'Auth',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', {
      type: 'User',
    });
  },
});

export const AuthMutation: NexusExtendTypeDef<any> = extendType({
  type: 'Mutation',
  definition(t: ObjectDefinitionBlock<'Mutation'>): void {
    t.nonNull.field('signup', {
      type: 'Auth',
      args: {
        email: nonNull(stringArg()),
        userName: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<NexusGenObjects['Auth']> {
        const { userName, email } = args;
        const password: string = await argon.hash(args.password);
        const user = await ctx.user.create({
          userName,
          password,
          email,
        });

        if (!user) throw new Error();
        const token: string = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
        );

        if (!token) throw new Error();
        return { token, user };
      },
    });

    t.nonNull.field('login', {
      type: 'Auth',
      args: {
        userName: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<NexusGenObjects['Auth']> {
        const { userName, password } = args;

        const user = await ctx.user.findOne({ userName: userName });

        if (!user) throw new Error();

        const passwordMatches: boolean = await argon.verify(
          user.password,
          password,
        );

        if (!passwordMatches) throw new Error();

        const token: string = jwt.sign(
          { userId: user._id },
          process.env.JWT_SECRET,
        );

        return { token, user };
      },
    });
  },
});
