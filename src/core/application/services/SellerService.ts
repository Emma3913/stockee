import axiosInstance from '../../../app/config/network/axiosIntance';

import {
  SellerInfoRequest,
  SellerInfoResponse,
  SellerInfoResponsePaginated,
} from '../../domain/entities/Seller';
import { PaginatedResponse } from '../../domain/types';

export async function registrerNewSeller(
  sellerInfoRequest: SellerInfoRequest,
): Promise<SellerInfoResponse> {
  try {
    const response = await axiosInstance.post<SellerInfoResponse>(
      'usuarios/registrar/vendedor',
      {
        nombre: sellerInfoRequest.nombre,
        email: sellerInfoRequest.email,
        password: sellerInfoRequest.password,
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

export async function getAllSellersByStore(
  page: number = 0,
  size: number = 10,
): Promise<PaginatedResponse<SellerInfoResponsePaginated>> {
  try {
    const response = await axiosInstance.get<
      PaginatedResponse<SellerInfoResponsePaginated>
    >(`usuarios/empleados?page=${page}&size=${size}`);
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
