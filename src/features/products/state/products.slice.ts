import { StateCreator } from 'zustand';
import { OwnerSliceType } from '../../owner/state/owner.slice';
import { EmployeesSliceType } from '../../employees/state/employees.slice';
import {
  loginWithEmailAndPassword,
  sendDataProduct,
} from '../../../core/application/services/AuthService';
import {
  ProductInfoRequest,
  ProductInfoResponse,
} from '../../../core/domain/entities/Products';

export type ProductsSliceType = {
  productInfoResponse: ProductInfoResponse;
  productInfoRequest: ProductInfoRequest;
  //   setProductInfoRequest: (productInfoRequest: ProductInfoRequest) => void;
  setProductInfoRequest: (
    updater:
      | ProductInfoRequest
      | ((prev: ProductInfoRequest) => ProductInfoRequest),
  ) => void;
  sendDataProduct: () => Promise<ProductInfoResponse>;
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

  //   setProductInfoRequest: productInfoRequest => set({ productInfoRequest }),
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
});
