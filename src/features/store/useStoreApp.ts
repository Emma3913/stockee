import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthSliceType, createAuthSlice } from '../auth/state/authLogin.slice';
import {
  createEmployeesSlice,
  EmployeesSliceType,
} from '../employees/state/employees.slice';
import { createOwnerSlice, OwnerSliceType } from '../owner/state/owner.slice';

export const useAppStore = create<
  AuthSliceType & EmployeesSliceType & OwnerSliceType
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createEmployeesSlice(...a),
    ...createOwnerSlice(...a),
  })),
);
