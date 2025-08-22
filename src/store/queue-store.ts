import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { QueuePage, QueueTodayStats } from "@/types/queue";

type QueueStore = {
  queuePage: QueuePage;
  queueStats: QueueTodayStats;
  loading: boolean;
  fetchQueuePage: (
    page: number,
    keyword?: { search?: string }
  ) => Promise<QueuePage | undefined>;
  fetchQueueStats: () => Promise<void>;
  setQueuePage: (queuePage: QueuePage) => void;
  setQueueStats: (queueStats: QueueTodayStats) => void;
};

export const useQueueStore = create<QueueStore>((set) => ({
  queuePage: {
    data: [],
    paging: {
      size: 0,
      total_pages: 0,
      current_page: 0,
    },
  },
  queueStats: {
    doctors_on_duty: 0,
    today: {
      cancelled_appointments: 0,
      completed_appointments: 0,
      pending_appointments: 0,
      total_appointments: 0,
    },
    queue_stats: {
      cancelled: 0,
      completed: 0,
      in_progress: 0,
      total_queues: 0,
      waiting: 0,
    },
  },
  loading: true,
  setQueuePage: (queuePage: QueuePage) => set({ queuePage }),
  setQueueStats: (queueStats: QueueTodayStats) => set({ queueStats }),
  fetchQueuePage: async (page: number = 1, keyword?: { search?: string }) => {
    try {
      const params: {
        page: number;
        size: number;
        search?: string;
      } = { page, size: 10 };

      if (keyword?.search) params.search = keyword.search;

      const res = await axiosInstance.get("/v1/queues", {
        params,
        withCredentials: true,
      });
      console.log(res.data);

      set({ queuePage: res.data, loading: false });
      console.log(res.data);

      return res.data as QueuePage;
      //eslint-disable-next-line
    } catch (error) {
      set({
        queuePage: {
          data: [],
          paging: { size: 0, total_pages: 0, current_page: 0 },
        },
        loading: false,
      });
    }
  },
  fetchQueueStats: async () => {
    try {
      const res = await axiosInstance.get("/v1/dashboard/stats", {
        withCredentials: true,
      });
      set({ queueStats: res.data.data, loading: false });
      //eslint-disable-next-line
    } catch (error) {
      set({
        queueStats: {
          doctors_on_duty: 0,
          today: {
            cancelled_appointments: 0,
            completed_appointments: 0,
            pending_appointments: 0,
            total_appointments: 0,
          },
          queue_stats: {
            cancelled: 0,
            completed: 0,
            in_progress: 0,
            total_queues: 0,
            waiting: 0,
          },
        },
        loading: false,
      });
    }
  },
}));
