import { StateCreator } from 'zustand';
import { OwnerSliceType } from '../../owner/state/owner.slice';
import { EmployeesSliceType } from '../../employees/state/employees.slice';
import {
  loginWithEmailAndPassword,
} from '../../../core/application/services/AuthService';
import {
  PaginatedProductsResponse,
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../../core/domain/entities/Products';
import { getAllProductsByUuidStore, sendDataProduct } from '../../../core/application/services/ProductsService';

export type ProductsSliceType = {
  productInfoResponse: ProductInfoResponse;
  paginatedProductsInfoResponse: PaginatedProductsResponse;
  productInfoRequest: ProductInfoRequest;
  setProductInfoRequest: (
    updater:
      | ProductInfoRequest
      | ((prev: ProductInfoRequest) => ProductInfoRequest),
  ) => void;
  sendDataProduct: () => Promise<ProductInfoResponse>;
  getAllProductsByUuidStore: (
    uuidTienda: string,
    page?: number,
    size?: number,
  ) => Promise<PaginatedProductsResponse>;
};

export const createProductsSlice: StateCreator<
  ProductsSliceType & OwnerSliceType & EmployeesSliceType,
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
    uuidTienda: '',
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
    items: [],
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

  sendDataProduct: async () => {
    const response = await sendDataProduct(get().productInfoRequest);
    set({ productInfoResponse: response });
    return response;
  },

  getAllProductsByUuidStore: async (uuidTienda, page = 0, size = 30) => {
    const response = await getAllProductsByUuidStore(uuidTienda, page, size);
    set({ paginatedProductsInfoResponse: response });
    return response;
  },
});
