import axiosInstance from '../../../app/config/network/axiosIntance';
import {
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../domain/entities/Products';
import { PaginatedResponse } from '../../domain/types';

export async function registerNewProduct(
  productoInfo: ProductInfoRequest,
): Promise<ProductInfoResponse> {
  console.log('productoInfo', productoInfo);

  try {
    const response = await axiosInstance.post<ProductInfoResponse>(
      'productos/guardar',
      {
        codigoBarras: productoInfo.codigoBarras,
        descripcion: productoInfo.descripcion,
        precio: productoInfo.precio,
        stock: productoInfo.stock,
        urlImagen: productoInfo.urlImagen,
        estatus: productoInfo.estatus,
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

export async function getAllProductsByStore(
  page: number = 0,
  size: number = 5,
): Promise<PaginatedResponse<ProductInfoResponse>> {
  try {
    const response = await axiosInstance.get<PaginatedResponse<ProductInfoResponse>>(
      `productos?page=${page}&size=${size}`,
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

export async function findProdcutByBarcode(
  barcode: string,
): Promise<ProductInfoResponse> {
  try {
    const response = await axiosInstance.get<ProductInfoResponse>(
      `productos/search?barcode=${barcode}`,
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
