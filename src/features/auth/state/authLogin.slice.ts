// src/infrastructure/auth/state/authSlice.ts
import { StateCreator } from 'zustand';
import {
  LoginRequest,
  LoginResponse,
} from '../../../core/domain/entities/Login';
import { OwnerSliceType } from '../../owner/state/owner.slice';

import { loginWithEmailAndPassword } from '../../../core/application/services/AuthService';
import { SellersSliceType } from '../../employees/state/sellers.slice';

export type AuthSliceType = {
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  setLoginRequest: (request: LoginRequest) => void;
  loginWithEmailAndPassword: () => Promise<LoginResponse>;
};

export const createAuthSlice: StateCreator<
  AuthSliceType & OwnerSliceType & SellersSliceType,
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
