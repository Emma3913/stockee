import axiosInstance from '../../../app/config/network/axiosIntance';
import { EndSaleResponse } from '../../domain/entities/Sales';

export async function endSale(): Promise<EndSaleResponse> {
  try {
    const response = await axiosInstance.post<EndSaleResponse>(
      'ventas/finalizar-venta',
    );
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

export async function saleResume(): Promise<string> {
  try {
    const response = await axiosInstance.get<string>('ventas');
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
