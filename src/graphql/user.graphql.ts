import { objectType, extendType } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.string('_id');
    t.nonNull.string('userName');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
