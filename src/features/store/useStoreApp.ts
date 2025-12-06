import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { AuthSliceType, createAuthSlice } from '../auth/state/authLogin.slice';

import { createOwnerSlice, OwnerSliceType } from '../owner/state/owner.slice';
import {
  createProductsSlice,
  ProductsSliceType,
} from '../products/state/products.slice';
import {
  createSellersSlice,
  SellersSliceType,
} from '../sellers/state/sellers.slice';
import {
  createShoppingCartSlice,
  ShoppingCartSliceType,
} from '../shoppingCart/state/shoppingCart.slice';

export const useAppStore = create<
  AuthSliceType &
    SellersSliceType &
    OwnerSliceType &
    ProductsSliceType &
    ShoppingCartSliceType
>()(
  devtools((...a) => ({
    ...createAuthSlice(...a),
    ...createSellersSlice(...a),
    ...createOwnerSlice(...a),
    ...createProductsSlice(...a),
    ...createShoppingCartSlice(...a),
  })),
);
