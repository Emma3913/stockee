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
): Promise<ProductInfoResponse> {
  try {
    const response = await axiosInstance.post<ProductInfoResponse>(
      '/producto/guardar',
      {
        codigoBarras: productoInfo.codigoBarras,
        descripcion: productoInfo.descripcion,
        precio: productoInfo.precio,
        stock: productoInfo.stock,
        urlImagen: productoInfo.urlImagen,
        estatus: productoInfo.estatus,
        uuidTienda: productoInfo.uuidTienda,
        base64Image: productoInfo.base64Image,
      },
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message ||
          `Error ${error.response.status}: ${error.response.statusText}`,
      );
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor');
    } else {
      throw new Error('Error inesperado al procesar la solicitud');
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
