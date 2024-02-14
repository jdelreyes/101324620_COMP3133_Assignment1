import { Document } from 'mongoose';

export interface EmployeeEntity extends Document {
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  salary: number;
}
