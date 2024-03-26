import { create } from "zustand";

type AuthStore = {
  isLogin: boolean;
  setIsLogin: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  setIsLogin: () => set({ isLogin: true }),
}));
