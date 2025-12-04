// src/infrastructure/auth/state/authSlice.ts
import { StateCreator } from 'zustand';
import {
  LoginRequest,
  LoginResponse,
} from '../../../core/domain/entities/Login';
import { OwnerSliceType } from '../../owner/state/owner.slice';

import { loginWithEmailAndPassword, resetPasswordByEmail } from '../../../core/application/services/AuthService';
import { SellersSliceType } from '../../sellers/state/sellers.slice';
import { ResetPasswordRequest, ResetPasswordResponse } from '../../../core/domain/entities/ResetPassword';


export type AuthSliceType = {
  loginRequest: LoginRequest;
  loginResponse: LoginResponse;
  resetPasswordRequest: ResetPasswordRequest;
  resetPasswordResponse: ResetPasswordResponse;
  setResetPasswordRequest: (request: ResetPasswordRequest) => void; 
  setLoginRequest: (request: LoginRequest) => void;
  loginWithEmailAndPassword: () => Promise<LoginResponse>;
  resetPasswordByEmail: () => Promise<ResetPasswordResponse>;
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
  resetPasswordRequest: {
    email: ''
  },

  resetPasswordResponse: {
    mensaje: ''
  },

  setLoginRequest: request => set({ loginRequest: request }),
  
  setResetPasswordRequest: request => set({ resetPasswordRequest: request }),

  loginWithEmailAndPassword: async () => {
    const loginResponse = await loginWithEmailAndPassword(get().loginRequest);
    set({ loginResponse });
    return loginResponse;
  },
  resetPasswordByEmail: async () => {
    const resetPasswordResponse = await resetPasswordByEmail(get().resetPasswordRequest);
    set({ resetPasswordResponse });
    return resetPasswordResponse;
  }
});
