import { model, Schema } from 'mongoose';
import { EmployeeEntity } from '../entities/employee.entity';

const employeeSchema: Schema<EmployeeEntity> = new Schema({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  lastName: {
    type: String,
    required: [true, 'lastName is required'],
  },
  email: {
    type: String,
    validate: {
      validator: (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      },
      message: 'Invalid email address',
    },
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  salary: {
    type: Number,
    required: [true, 'salary is required'],
  },
});

const  EmployeeModel= model<EmployeeEntity>('EmployeeModel', employeeSchema);

export default EmployeeModel;