import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { DoctorPage } from "@/types/doctor";

type DoctorStore = {
  doctorPage: DoctorPage;
  loading: boolean;
  fetchDoctorPage: (
    page: number,
    keyword?: { name?: string; specialization?: string }
  ) => Promise<void>;
  setDoctorPage: (doctor: DoctorPage) => void;
};

export const useDoctorStore = create<DoctorStore>((set) => ({
  doctorPage: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setDoctorPage: (doctorPage: DoctorPage) => set({ doctorPage }),
  fetchDoctorPage: async (
    page: number = 1,
    keyword?: { name?: string; specialization?: string }
  ) => {
    try {
      const params: {
        page: number;
        size: number;
        name?: string;
        specialization?: string;
      } = { page, size: 5 };

      if (keyword?.name?.trim()) params.name = keyword.name;
      if (keyword?.specialization?.trim())
        params.specialization = keyword.specialization;

      const res = await axiosInstance.get("/v1/doctors/list", {
        params,
        withCredentials: true,
      });
      set({ doctorPage: res.data, loading: false });
      //eslint-disable-next-line
    } catch (error) {
      set({
        doctorPage: {
          data: [],
          paging: { size: 0, total_page: 0, current_page: 0 },
        },
        loading: false,
      });
    }
  },
}));
