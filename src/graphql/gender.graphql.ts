import { enumType } from 'nexus';

export const Gender = enumType({
  name: 'Gender',
  members: {
    male: 'male',
    female: 'female',
    other: 'other',
  },
});
