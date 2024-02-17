import { objectType, extendType, stringArg, nonNull, floatArg } from 'nexus';
import { NexusExtendTypeDef, NexusObjectTypeDef, ObjectDefinitionBlock } from 'nexus/dist/core';

export const Employee: NexusObjectTypeDef<'Employee'> = objectType({
  name: 'Employee',
  definition(t) {
    t.nonNull.string('_id');
    t.nonNull.string('firstName');
    t.nonNull.string('lastName');
    t.nonNull.string('email');
    t.nonNull.string('gender');
    t.nonNull.float('salary');
  },
});

export const EmployeeQuery: NexusExtendTypeDef<any> = extendType({
  type: 'Query',
  definition(t: ObjectDefinitionBlock<"Query">): void {
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
        _id: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
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
        gender: nonNull(stringArg()),
        salary: nonNull(floatArg()),
      },
      async resolve(parent, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');
        const { firstName, lastName, email, gender, salary } = args;

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
        _id: nonNull(stringArg()),
        firstName: stringArg(),
        lastName: stringArg(),
        email: stringArg(),
        gender: stringArg(),
        salary: floatArg(),
      },
      async resolve(parent, args, ctx) {
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
        _id: nonNull(stringArg()),
      },
      async resolve(parent, args, ctx) {
        if (!ctx.userId) throw new Error('Unauthorized');
        const _id = args._id;
        return await ctx.employee.findOneAndDelete({ _id });
      },
    });
  },
});
