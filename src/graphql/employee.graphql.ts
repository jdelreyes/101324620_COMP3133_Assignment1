import { objectType, extendType, stringArg, nonNull, floatArg } from 'nexus';
import {
  NexusExtendTypeDef,
  NexusObjectTypeDef,
  ObjectDefinitionBlock,
  arg,
  idArg,
} from 'nexus/dist/core';
import { NexusGenObjects } from '../../nexus-typegen';

export const Employee: NexusObjectTypeDef<'Employee'> = objectType({
  name: 'Employee',
  definition(t) {
    t.nonNull.id('_id');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.field('gender', { type: 'Gender' });
    t.nonNull.float('salary');
  },
});

export const EmployeeQuery: NexusExtendTypeDef<any> = extendType({
  type: 'Query',
  definition(t: ObjectDefinitionBlock<'Query'>): void {
    t.nonNull.list.nonNull.field('getEmployees', {
      type: 'Employee',
      async resolve(parent, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');

        return await ctx.employee.find();
      },
    });

    t.nonNull.field('getEmployee', {
      type: 'Employee',
      args: {
        _id: nonNull(idArg()),
      },
      async resolve(_, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');

        return await ctx.employee.findOne({ _id: args._id });
      },
    });
  },
});

export const EmployeeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createEmployee', {
      type: 'Employee',
      args: {
        firstName: nonNull(stringArg()),
        lastName: nonNull(stringArg()),
        email: nonNull(stringArg()),
        gender: nonNull(arg({ type: 'Gender', default: 'other' })),
        salary: nonNull(floatArg()),
      },

      async resolve(_, args, ctx): Promise<NexusGenObjects['Employee']> {
        if (!ctx.userId) throw new Error('Unauthorized');
        const { firstName, lastName, email, gender, salary } = args;

        // * ts-ignored since there is conflict between mongoose return type
        // *  and the nexus Graphql Gender object enum saying that ['male', 'female', 'other']
        // *  is not compatible with string mongoose provided after employee is made.
        // *  nevertheless, app still works.
        // @ts-ignore
        return await ctx.employee.create({
          firstName,
          lastName,
          email,
          gender,
          salary,
        });
      },
    });

    t.nonNull.field('updateEmployee', {
      type: 'Employee',
      args: {
        _id: nonNull(idArg()),
        firstName: stringArg(),
        lastName: stringArg(),
        email: stringArg(),
        gender: arg({ type: 'Gender' }),
        salary: floatArg(),
      },
      async resolve(_, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');
        const { _id, firstName, lastName, email, gender, salary } = args;
        return await ctx.employee.findOneAndUpdate(
          { _id },
          { firstName, lastName, email, gender, salary },
          { new: true },
        );
      },
    });

    t.nonNull.field('deleteEmployee', {
      type: 'Employee',
      args: {
        _id: nonNull(idArg()),
      },
      async resolve(_, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');
        const _id = args._id;
        return await ctx.employee.findOneAndDelete({ _id });
      },
    });
  },
});
