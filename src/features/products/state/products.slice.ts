import { StateCreator } from 'zustand';
import { OwnerSliceType } from '../../owner/state/owner.slice';

import {
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../../core/domain/entities/Products';
import { PaginatedResponse } from '../../../core/domain/types';
import { SellersSliceType } from '../../sellers/state/sellers.slice';
import {
  findProdcutByBarcode,
  getAllProductsByStore,
  registerNewProduct,
} from '../../../core/application/services/ProductsService';
import { StyleBuilderConfig } from 'react-native-reanimated/lib/typescript/common';

export type ProductsSliceType = {
  productInfoResponse: ProductInfoResponse;
  paginatedProductsInfoResponse: PaginatedResponse<ProductInfoResponse>;
  productInfoRequest: ProductInfoRequest;
  setProductInfoRequest: (
    updater:
      | ProductInfoRequest
      | ((prev: ProductInfoRequest) => ProductInfoRequest),
  ) => void;
  registerNewProduct: () => Promise<ProductInfoResponse>;
  getAllProductsByStore: (
    page?: number,
    size?: number,
  ) => Promise<PaginatedResponse<ProductInfoResponse>>;
  resetProductInfoRequest: () => void;
  findProdcutByBarcode: (barcode: string) => Promise<ProductInfoResponse>;
};

export const createProductsSlice: StateCreator<
  ProductsSliceType & OwnerSliceType & SellersSliceType,
  [],
  [],
  ProductsSliceType
> = (set, get) => ({
  productInfoRequest: {
    base64Image: '',
    codigoBarras: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    estatus: true,
    urlImagen: '',
  },

  productInfoResponse: {
    id: 0,
    codigoBarras: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    urlImagen: '',
    estatus: true,
    fechaCreacion: '',
    uuidTienda: '',
    message: '',
    success: false,
  },

  paginatedProductsInfoResponse: {
    data: [],
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    totalItems: 0,
    totalPages: 0,
  },

  setProductInfoRequest: updater =>
    set(state => ({
      productInfoRequest:
        typeof updater === 'function'
          ? updater(state.productInfoRequest)
          : updater,
    })),

  registerNewProduct: async () => {
    const response = await registerNewProduct(get().productInfoRequest);
    set({ productInfoResponse: response });
    get().resetProductInfoRequest();
    return response;
  },

  getAllProductsByStore: async (page = 0, size = 30) => {
    const response = await getAllProductsByStore(page, size);
    set({ paginatedProductsInfoResponse: response });
    return response;
  },

  resetProductInfoRequest: () =>
    set({
      productInfoRequest: {
        base64Image: '',
        codigoBarras: '',
        descripcion: '',
        precio: 0,
        stock: 0,
        estatus: true,
        urlImagen: '',
      },
    }),

  findProdcutByBarcode: async (barcode: string) => {
    const response = await findProdcutByBarcode(barcode);
    set({ productInfoResponse: response });
    return response;
  },
});
