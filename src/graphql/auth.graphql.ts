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
        email: nonNull(stringArg()),
        userName: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx): Promise<NexusGenObjects['Auth']> {
        const { userName, email } = args;
        const password = await argon.hash(args.password);
        console.log(password, args.password);
        const user = await ctx.user.create({ userName, password, email });

        if (!user) throw new Error();
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

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

        console.log(user.password, password);

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
