// src/infrastructure/auth/state/authSlice.ts
import { StateCreator } from 'zustand';
import {
  LoginRequest,
  LoginResponse,
} from '../../../core/domain/entities/Login';
import { OwnerSliceType } from '../../owner/state/owner.slice';
import { EmployeesSliceType } from '../../employees/state/employees.slice';
import { loginWithEmailAndPassword } from '../../../core/application/services/AuthService';

export type AuthSliceType = {
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  setLoginRequest: (request: LoginRequest) => void;
  loginWithEmailAndPassword: () => Promise<LoginResponse>;
};

export const createAuthSlice: StateCreator<
  AuthSliceType & OwnerSliceType & EmployeesSliceType,
  [],
  [],
  AuthSliceType
> = (set, get) => ({
  loginRequest: {
    email: '',
    password: '',
  },

  loginResponse: {
    nombre: '',
    rol: '',
    token: '',
    uuidTienda: '',
  },

  setLoginRequest: request => set({ loginRequest: request }),

  loginWithEmailAndPassword: async () => {
    const loginResponse = await loginWithEmailAndPassword(get().loginRequest);
    set({ loginResponse });
    return loginResponse;
  },
});
