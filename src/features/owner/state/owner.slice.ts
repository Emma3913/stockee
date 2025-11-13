import { StateCreator } from 'zustand';
import { Employee } from '../../../core/domain/entities/Employee';
import { AuthSliceType } from '../../auth/state/authLogin.slice';
import { EmployeesSliceType } from '../../employees/state/employees.slice';

export type OwnerSliceType = {
  employee: Employee;
};

export const createOwnerSlice: StateCreator<
  OwnerSliceType & AuthSliceType & EmployeesSliceType,
  [],
  [],
  OwnerSliceType
> = set => ({
  employee: {
    id: '',
    name: '',
    email: '',
    telefono: '',
    address: '',
    totalPurchases: 0,
  },
});
