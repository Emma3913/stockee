// src/features/auth/state/authSession.store.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../../../core/domain/entities/Login';

type AuthSessionState = {
  token: string | null;
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: LoginResponse) => Promise<void>;
  clearSession: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthSessionStore = create<AuthSessionState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setSession: async user => {
    await AsyncStorage.setItem('ACCESS_TOKEN', user.token);
    set({
      user,
      token: user.token,
      isAuthenticated: true,
    });
  },

  clearSession: async () => {
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    set({
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  },
}));
