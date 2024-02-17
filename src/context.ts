import EmployeeModel from './models/employee.model';
import UserModel from './models/user.model';
import { Request } from 'express';
import { decodeAuthHeader } from './utils/auth';

export const user = UserModel;
export const employee = EmployeeModel;

export interface Context {
  user: typeof UserModel;
  employee: typeof EmployeeModel;
  userId?: number;
}

export const context = ({ req }: { req: Request }): Context => {
  const token =
    req && req.headers.authorization
      ? decodeAuthHeader(req.headers.authorization)
      : null;

  return { user, employee, userId: token?.userId };
};
