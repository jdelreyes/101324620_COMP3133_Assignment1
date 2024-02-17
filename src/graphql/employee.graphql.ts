import { objectType, extendType } from 'nexus';

export const Employee = objectType({
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

export const EmployeeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('getEmployees', {
      type: 'Employee',
      async resolve(parent, args, ctx) {
        return ctx.employee.find();
      },
    });
  },
});
