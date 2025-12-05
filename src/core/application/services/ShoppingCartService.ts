import axiosInstance from "../../../app/config/network/axiosIntance";
import { ProductInfoResponse } from "../../domain/entities/Products";
import { AddProductToShoppingCartRequest, AddProductToShoppingCartResponse, ShoppingCartResponse } from "../../domain/entities/ShoppingCart";
import { PaginatedResponse } from "../../domain/types";

export async function getAllProductsInTheShoppingCart(
  page: number = 0,
  size: number = 5,
): Promise<PaginatedResponse<ShoppingCartResponse>> {
  try {
    const response = await axiosInstance.get<PaginatedResponse<ShoppingCartResponse>>(
      `carrito?page=${page}&size=${size}`,
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

export async function addProductsToShoppingCart(
  addProductToShoppingCartRequest: AddProductToShoppingCartRequest,
): Promise<AddProductToShoppingCartResponse> {
  try {
    const response = await axiosInstance.post<AddProductToShoppingCartResponse>('carrito/add-product', {
      codigoBarras: addProductToShoppingCartRequest.codigoBarras,
      cantidad: addProductToShoppingCartRequest.cantidad,
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