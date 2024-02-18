import { objectType } from 'nexus';
import { NexusObjectTypeDef, ObjectDefinitionBlock } from 'nexus/dist/core';

export const User: NexusObjectTypeDef<'User'> = objectType({
  name: 'User',
  definition(t: ObjectDefinitionBlock<'User'>): void {
    t.nonNull.id('_id');
    t.nonNull.string('userName');
    t.nonNull.string('email');
    t.nonNull.string('password');
  },
});
