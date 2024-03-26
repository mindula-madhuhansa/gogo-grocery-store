import { create } from "zustand";

type CartItemStoreState = {
  totalItems: number;
  setTotalItems: (length: number) => void;
};

export const useCartItemStore = create<CartItemStoreState>((set) => ({
  totalItems: 0,
  setTotalItems: (length) => {
    set({ totalItems: length });
  },
}));
