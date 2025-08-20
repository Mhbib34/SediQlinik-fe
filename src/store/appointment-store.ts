import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { AppointmentPage } from "@/types/appointment";

type AppointmentStore = {
  appointmentPage: AppointmentPage;
  loading: boolean;
  fetchAppointmentPage: (
    page: number,
    keyword?: { appointment_date?: string }
  ) => Promise<AppointmentPage | undefined>;
  setAppointmentPage: (appointmentPage: AppointmentPage) => void;
};

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointmentPage: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setAppointmentPage: (appointmentPage: AppointmentPage) =>
    set({ appointmentPage }),
  fetchAppointmentPage: async (
    page: number = 1,
    keyword?: { appointment_date?: string }
  ) => {
    try {
      const params: {
        page: number;
        size: number;
        appointment_date?: string;
      } = { page, size: 10 };

      if (keyword?.appointment_date)
        params.appointment_date = keyword.appointment_date;

      const res = await axiosInstance.get("/v1/appointments", {
        params,
        withCredentials: true,
      });
      console.log(res.data);

      set({ appointmentPage: res.data, loading: false });
      return res.data as AppointmentPage;
      //eslint-disable-next-line
    } catch (error) {
      set({
        appointmentPage: {
          data: [],
          paging: { size: 0, total_page: 0, current_page: 0 },
        },
        loading: false,
      });
    }
  },
}));
