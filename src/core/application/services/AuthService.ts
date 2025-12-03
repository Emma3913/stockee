import axiosInstance from '../../../app/config/network/axiosIntance';
import { LoginRequest, LoginResponse } from '../../domain/entities/Login';
import { ResetPasswordRequest, ResetPasswordResponse } from '../../domain/entities/ResetPassword';

const backendUrl = 'https://unkneaded-deepeningly-sandra.ngrok-free.dev'; // TODO: Hacer validacion de que URL esta disponible

export async function loginWithEmailAndPassword(
  loginRequest: LoginRequest,
): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>('/auth/login', {
      email: loginRequest.email,
      password: loginRequest.password,
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`;
      console.error('Server error:', message);
      throw new Error(message);
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No se pudo conectar con el servidor');
    } else {
      console.error('Unexpected error:', error.message);
      throw new Error('Error inesperado al procesar la solicitud');
    }
  }
}

export async function resetPasswordByEmail(email: ResetPasswordRequest): Promise<ResetPasswordResponse> {
  try {
    const response = await axiosInstance.post<{ message: ResetPasswordResponse }>(
      '/auth/reestablecer-password',
      { email },
    );

    return response.data.message;
  } catch (error: any) {
    if (error.response) {
      const message =
        error.response.data?.message ||
        `Error ${error.response.status}: ${error.response.statusText}`;
      console.error('Server error:', message);
      throw new Error(message);
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No se pudo conectar con el servidor');
    } else {
      console.error('Unexpected error:', error.message);
      throw new Error('Error inesperado al procesar la solicitud');
    }
  }
}
