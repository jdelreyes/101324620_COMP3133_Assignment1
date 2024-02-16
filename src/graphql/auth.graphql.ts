import { extendType, objectType, nonNull, stringArg, idArg } from 'nexus';
import * as jwt from 'jsonwebtoken';
import * as argon from 'argon2';
import { NexusGenObjects } from '../../nexus-typegen';

export const Auth = objectType({
  name: 'Auth',
  definition(t) {
    t.nonNull.string('token');
    t.nonNull.field('user', {
      type: 'User',
    });
  },
});

export const AuthMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('signup', {
      type: 'Auth',
      args: {
        userName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<NexusGenObjects['Auth']> {
        const { userName, email } = args;
        const password = argon.hash(args.password);
        const user = await ctx.user.create({ userName, password, email });

        if (!user) throw new Error();
        const token = jwt.sign({ userId: user.id }, process.env.JSON_TOKEN);

        if (!token) throw new Error();
        return { token, user };
      },
    });
  },
});
