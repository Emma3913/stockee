import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authReducer, initialAuthState, AuthState, AuthAction } from './authReducer';

interface AuthContextProps {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [state, dispatch] = useReducer(authReducer, initialAuthState);
    // Solo restaurar token al montar

    // Load token from AsyncStorage on mount
    useEffect(() => {
        const loadToken = async () => {
            dispatch({ type: 'SET_LOADING', payload: true });
            try {
                const raw = await AsyncStorage.getItem('jwt');
                if (raw) {
                    let token = raw;
                    try {
                        const parsed = JSON.parse(raw);
                        token = parsed.token || raw;
                    } catch { }
                    if (token && typeof token === 'string' && token.length > 0) {
                        dispatch({ type: 'LOGIN_SUCCESS', payload: { token, nombre: 'Usuario autenticado', rol: '', uuidTienda: '' }, });
                    }
                }
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        loadToken();
    }, []);

    // Save token to AsyncStorage on login
    useEffect(() => {
        if (state.token) {
            // Save token and user info as JSON
            AsyncStorage.setItem('jwt', JSON.stringify({ token: state.token, user: state.user, rol: state.user }));
        } else {
            AsyncStorage.removeItem('jwt');
        }
    }, [state.token, state.user]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};