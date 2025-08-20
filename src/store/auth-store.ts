import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { User } from "@/types/user";
import { showSuccess } from "@/lib/sonner";

type AuthStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  users: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/v1/users", {
        withCredentials: true,
      });
      set({ user: res.data.data, loading: false });
      //eslint-disable-next-line
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.delete("/v1/auth/logout", {
        withCredentials: true,
      });
      set({ user: null, loading: false });
      showSuccess(res.data.message);
    } catch (error) {
      set({ loading: false });
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  },
}));
