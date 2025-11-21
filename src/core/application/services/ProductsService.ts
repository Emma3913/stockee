import axiosInstance from '../../../app/config/network/axiosIntance';
import {
  PaginatedProductsResponse,
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../domain/entities/Products';

export async function sendDataProduct(
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

export async function getAllProductsByUuidStore(
  uuidTienda: string,
  page: number = 0,
  size: number = 10,
) {
  try {
    const response = await axiosInstance.get<PaginatedProductsResponse>(
      `productos?uuidTienda=${uuidTienda}&page=${page}&size=${size}`,
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
