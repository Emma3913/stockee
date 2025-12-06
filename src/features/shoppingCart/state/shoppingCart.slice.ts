import { StateCreator } from 'zustand';
import { ProductsSliceType } from '../../products/state/products.slice';
import { OwnerSliceType } from '../../owner/state/owner.slice';
import { SellersSliceType } from '../../sellers/state/sellers.slice';
import {
  PaginatedResponse,
  PaginatedResponseShoppingCart,
} from '../../../core/domain/types';
import {
  AddProductToShoppingCartRequest,
  AddProductToShoppingCartResponse,
  ShoppingCartResponse,
} from '../../../core/domain/entities/ShoppingCart';
import {
  addProductsToShoppingCart,
  getAllProductsInTheShoppingCart,
} from '../../../core/application/services/ShoppingCartService';
import { endAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
import {
  endSale,
  saleResume,
} from '../../../core/application/services/VentasService';
import { EndSaleResponse } from '../../../core/domain/entities/Sales';

export type ShoppingCartSliceType = {
  addProductToShoppingCartResponse: AddProductToShoppingCartResponse;
  paginatedShoppingCartInfoResponse: PaginatedResponseShoppingCart<ShoppingCartResponse>;
  addProductToShoppingCartRequest: AddProductToShoppingCartRequest;
  setAddProductToShoppingCartRequest: (
    updater:
      | AddProductToShoppingCartRequest
      | ((
          prev: AddProductToShoppingCartRequest,
        ) => AddProductToShoppingCartRequest),
  ) => void;
  addProductsToShoppingCart: () => Promise<AddProductToShoppingCartResponse>;
  getAllProductsInTheShoppingCart: (
    page?: number,
    size?: number,
  ) => Promise<PaginatedResponseShoppingCart<ShoppingCartResponse>>;
  endSale: () => Promise<EndSaleResponse>;
  saleResume: () => Promise<string>;
  // resetProductInfoRequest: () => void;
};

export const createShoppingCartSlice: StateCreator<
  ShoppingCartSliceType & OwnerSliceType & SellersSliceType,
  [],
  [],
  ShoppingCartSliceType
> = (set, get) => ({
  addProductToShoppingCartResponse: {
    mensaje: '',
  },

  addProductToShoppingCartRequest: {
    cantidad: 0,
    codigoBarras: '',
  },

  paginatedShoppingCartInfoResponse: {
    data: null,
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    totalItems: 0,
    totalPages: 0,
  },

  setAddProductToShoppingCartRequest: updater =>
    set(state => ({
      addProductToShoppingCartRequest:
        typeof updater === 'function'
          ? updater(state.addProductToShoppingCartRequest)
          : updater,
    })),

  addProductsToShoppingCart: async () => {
    const response = await addProductsToShoppingCart(
      get().addProductToShoppingCartRequest,
    );
    set({ addProductToShoppingCartResponse: response });
    return response;
  },

  getAllProductsInTheShoppingCart: async (page = 0, size = 10) => {
    const response = await getAllProductsInTheShoppingCart(page, size);
    set({ paginatedShoppingCartInfoResponse: response });
    return response;
  },
  endSale: async () => {
    const response = await endSale();
    return response;
  },
  saleResume: async () => {
    const response = await saleResume();
    return response;
  },
});
