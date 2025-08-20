import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { User, UserPage } from "@/types/user";
import { showSuccess } from "@/lib/sonner";

type AuthStore = {
  user: User | null;
  users: UserPage;
  loading: boolean;
  fetchUser: () => Promise<void>;
  fetchUsers: (page: number) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  setUsers: (users: UserPage) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  users: {
    data: [],
    paging: {
      size: 0,
      total_pages: 0,
      current_page: 0,
    },
  },
  loading: true,
  setUser: (user) => set({ user }),
  setUsers: (users: UserPage) => set({ users }),
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

  fetchUsers: async (page: number) => {
    try {
      const params: { page: number; size: number } = { page, size: 10 };
      const res = await axiosInstance.get("/v1/users/list", {
        params,
        withCredentials: true,
      });
      set({ users: res.data, loading: false });

      //eslint-disable-next-line
    } catch (error) {
      set({
        users: {
          data: [],
          paging: { size: 0, total_pages: 0, current_page: 0 },
        },
        loading: false,
      });
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
