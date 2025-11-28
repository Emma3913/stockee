import { StateCreator } from 'zustand';
import { AuthSliceType } from '../../auth/state/authLogin.slice';
import { OwnerSliceType } from '../../owner/state/owner.slice';
import { SellerInfoRequest, SellerInfoResponse, SellerInfoResponsePaginated } from '../../../core/domain/entities/Seller';
import { PaginatedResponse } from '../../../core/domain/types';
import { getAllSellersByStore, registrerNewSeller } from '../../../core/application/services/SellerService';

export type SellersSliceType = {
  sellerInfoRequest: SellerInfoRequest;
  paginatedSellersInfoResponse: PaginatedResponse<SellerInfoResponsePaginated>;
  sellerInfoResponse: SellerInfoResponse;
  setSellerInfoRequest: (
      updater:
        | SellerInfoRequest
        | ((prev: SellerInfoRequest) => SellerInfoRequest),
    ) => void;
    registrerNewSeller: () => Promise<SellerInfoResponse>;
    getAllSellersByStore: (
      page?: number,
      size?: number,
    ) => Promise<PaginatedResponse<SellerInfoResponsePaginated>>;
};

export const createSellersSlice: StateCreator<
  SellersSliceType & AuthSliceType & OwnerSliceType,
  [],
  [],
  SellersSliceType
> = (set, get) => ({
  sellerInfoRequest: { 
    email: '',
    nombre: '',
    password: '',
  },
  sellerInfoResponse: {
    nombre: '',
    rol: '',
    tiendaId: 0,
    token: '',
    uuidTienda: ''
  },
  paginatedSellersInfoResponse: {
    items: [],
    currentPage: 0,
    nextPage: null,
    previousPage: null,
    totalItems: 0,
    totalPages: 0,
  },
   setSellerInfoRequest: updater =>
      set(state => ({
        sellerInfoRequest:
          typeof updater === 'function'
            ? updater(state.sellerInfoRequest)
            : updater,
      })),
  
    registrerNewSeller: async () => {
      const response = await registrerNewSeller(get().sellerInfoRequest);
      set({ sellerInfoResponse: response });
      return response;
    },
  
    getAllSellersByStore: async (page = 0, size = 30) => {
      const response = await getAllSellersByStore(page, size);
      set({ paginatedSellersInfoResponse: response });
      return response;
    },
});
