import { AuthResponseDTO } from '../../core/domain/dto/dto';

export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthResponseDTO['user'] | null;
  token: string | null;
  error: string | null;
}

export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: AuthResponseDTO }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean };

export const initialAuthState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
  token: null,
  error: null,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
        isLoading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialAuthState,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
}
