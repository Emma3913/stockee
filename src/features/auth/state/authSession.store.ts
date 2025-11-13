// import { create } from 'zustand';
// import { persist, createJSONStorage } from 'zustand/middleware';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LoginResponse } from '../../../core/domain/entities/Login';

// type AuthSessionState = {
//   token: string | null;
//   user: LoginResponse | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   uuidStore: string | null;
//   setSession: (user: LoginResponse) => void; // ← Quitar async
//   clearSession: () => void; // ← Quitar async
//   // initializeAuth: () => void; // ← Quitar async
// };

// export const useAuthSessionStore = create<AuthSessionState>()(
//   persist(
//     (set, get) => ({
//       token: null,
//       user: null,
//       isAuthenticated: false,
//       isLoading: true,
//       uuidStore: null,

//       setSession: user => {
//         set({
//           user,
//           token: user.token,
//           uuidStore: user.uuidTienda,
//           isAuthenticated: true,
//         });
//         // El middleware persist se encarga de guardar en AsyncStorage automáticamente
//       },

//       clearSession: () => {
//         set({
//           user: null,
//           token: null,
//           uuidStore: null,
//           isAuthenticated: false,
//         });
//         // El middleware persist se encarga de limpiar AsyncStorage automáticamente
//       },

//       // initializeAuth: () => {
//       //   // Esta función ya no es necesaria porque el middleware
//       //   // inicializa automáticamente desde AsyncStorage
//       //   set({ isLoading: false });
//       // },
//     }),
//     {
//       name: 'auth-storage', // nombre único para el storage
//       storage: createJSONStorage(() => AsyncStorage),
//       // Opcional: seleccionar qué partes del estado persistir
//       partialize: state => ({
//         token: state.token,
//         user: state.user,
//         uuidStore: state.uuidStore,
//         isAuthenticated: state.isAuthenticated,
//       }),
//     },
//   ),
// );

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponse } from '../../../core/domain/entities/Login';

type AuthSessionState = {
  token: string | null;
  user: LoginResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  uuidStore: string | null;
  setSession: (user: LoginResponse) => Promise<void>;
  clearSession: () => Promise<void>;
  initializeAuth: () => Promise<void>;
};

export const useAuthSessionStore = create<AuthSessionState>(set => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,
  uuidStore: null,

  setSession: async user => {
    await AsyncStorage.setItem('ACCESS_TOKEN', user.token);
    await AsyncStorage.setItem('UUID_STORE', user.uuidTienda);
    set({
      user,
      token: user.token,
      isAuthenticated: true,
    });
  },

  clearSession: async () => {
    await AsyncStorage.removeItem('ACCESS_TOKEN');
    await AsyncStorage.removeItem('UUID_STORE');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  initializeAuth: async () => {
    const token = await AsyncStorage.getItem('ACCESS_TOKEN');
    const uuidStore = await AsyncStorage.getItem('UUID_STORE');
    set({
      token,
      isAuthenticated: !!token,
      isLoading: false,
      uuidStore,
    });
  },
}));
