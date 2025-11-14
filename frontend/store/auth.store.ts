import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  address: string | null;
  email: string | null;
  setAuth: (address: string, email?: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      address: null,
      email: null,
      setAuth: (address, email) =>
        set({
          isAuthenticated: true,
          address,
          email: email || null,
        }),
      clearAuth: () =>
        set({
          isAuthenticated: false,
          address: null,
          email: null,
        }),
    }),
    {
      name: "auth-storage",
    }
  )
);
