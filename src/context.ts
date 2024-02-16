import EmployeeModel from './models/employee.model';
import UserModel from './models/user.model';

export const user = UserModel;
export const employee = EmployeeModel;

export interface Context {
  user: typeof UserModel;
  employee: typeof EmployeeModel;
}

export const context = (): Context => {
  return { user, employee };
};
