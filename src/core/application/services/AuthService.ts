import axiosInstance from '../../../app/config/network/axiosIntance';
import { LoginRequest, LoginResponse } from '../../domain/entities/Login';
import {
  ErrorResponse,
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../domain/entities/Products';

// const backendUrl = BACKEND_URL;
// const backendUrl = 'http://localhost:8080';
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

export async function resetPasswordByEmail(email: string): Promise<string> {
  try {
    const response = await axiosInstance.post<{ message: string }>(
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

export async function sendDataProduct(
  productoInfo: ProductInfoRequest,
  token: string,
): Promise<ProductInfoResponse> {
  try {
    console.log('Enviando producto:', productoInfo);
    const url = `${backendUrl}/productos/guardar`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productoInfo),
    });

    const data: ProductInfoResponse | ErrorResponse = await response.json();

    if (!response.ok) {
      const errorData = data as ErrorResponse;
      console.error('Error desde servidor:', errorData);

      let errorMessage = errorData.message || 'Error al guardar el producto';

      if (errorMessage.includes('código de barras')) {
        errorMessage = 'Error en el código de barras: ' + errorMessage;
      } else if (errorMessage.includes('precio')) {
        errorMessage = 'Error en el precio: ' + errorMessage;
      } else if (errorMessage.includes('stock')) {
        errorMessage = 'Error en el stock: ' + errorMessage;
      }

      throw new Error(errorMessage);
    }

    console.log('Producto guardado exitosamente:', data);
    return data as ProductInfoResponse;
  } catch (error: any) {
    if (error instanceof Error) {
      console.error('Error en sendDataProduct:', error.message);
      throw error;
    } else {
      console.error('Error desconocido en sendDataProduct:', error);
      throw new Error('Error de conexión al enviar el producto');
    }
  }
}

export async function registerUsuario({
  email,
  password,
  nombre,
  estatus = true,
  rolId = 1,
  tiendaId = 1,
}: {
  email: string;
  password: string;
  nombre: string;
  estatus?: boolean;
  rolId?: number;
  tiendaId?: number;
}) {
  try {
    const url = `${backendUrl}/auth/registrarUsuario`;
    const body = {
      nombre,
      correo: email,
      password,
      estatus,
      rolForUsuario: { id: rolId },
      tiendaForUsuario: { id: tiendaId },
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
    const text = await response.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (e) {
      // No es JSON
    }
    if (!response.ok) {
      throw new Error(data?.message || 'Registro fallido');
    }
    return data;
  } catch (error) {
    throw error;
  }
}
