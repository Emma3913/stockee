import { StateCreator } from 'zustand';
import { Employee } from '../../../core/domain/entities/Seller';
import { AuthSliceType } from '../../auth/state/authLogin.slice';
import { SellersSliceType } from '../../employees/state/sellers.slice';


export type OwnerSliceType = {
  employee: Employee;
};

export const createOwnerSlice: StateCreator<
  OwnerSliceType & AuthSliceType & SellersSliceType,
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
