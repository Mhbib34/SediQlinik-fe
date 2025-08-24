import Pagination from "@/components/fragment/Paginations";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { QueuePage } from "@/types/queue";
import { isErrorResponse } from "@/utils/error-response";
import { Format } from "@/utils/format";
import { getCurrentTime } from "@/utils/time";
import { Calendar, User } from "lucide-react";

type Props = {
  queuePage: QueuePage;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  fetchQueuePage: (page: number) => Promise<QueuePage | undefined>;
};

const Queue = ({
  queuePage,
  currentPage,
  setCurrentPage,
  getStatusBadge,
  fetchQueuePage,
}: Props) => {
  const handleCalledPatient = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/call`, {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
    } catch (error) {
      isErrorResponse(error, "Called patient failed. Please try again.");
    }
  };
  const handleCompletedPatient = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/complete`, {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
    } catch (error) {
      isErrorResponse(error, "Complete patient failed. Please try again.");
    }
  };
  const handleSkipPatient = async (id: string) => {
    try {
      const res = await axiosInstance.put(`/v1/queues/${id}/skip`, {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      fetchQueuePage(currentPage);
    } catch (error) {
      isErrorResponse(error, "Skip patient failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Semua Antrian Hari Ini
          </h2>
          <p className="text-sm text-slate-500">{getCurrentTime()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="space-y-4">
            {queuePage.data.map((queue) => (
              <div
                key={queue.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {queue.appointment?.patient_name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {queue.appointment?.complaint}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {Format.formatDate(queue.queue_date!)}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        Nomor Antrian : {queue.queue_number}
                      </span>
                    </div>
                    <div
                      className={`${
                        queue.status === "completed" ||
                        queue.status === "cancelled"
                          ? "hidden"
                          : ""
                      } space-x-4 mt-1`}
                    >
                      <span>{getStatusBadge(queue.status!)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div
                    className={`${
                      queue.status === "completed" ||
                      queue.status === "cancelled"
                        ? "hidden"
                        : ""
                    } flex space-x-2`}
                  >
                    <button
                      onClick={() => handleCalledPatient(queue.id)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700 transition-colors cursor-pointer"
                    >
                      Panggil
                    </button>
                    <button
                      onClick={() => handleCompletedPatient(queue.id)}
                      className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Selesai
                    </button>
                    <button
                      onClick={() => handleSkipPatient(queue.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Skip
                    </button>
                  </div>
                  <div
                    className={`${
                      queue.status === "waiting" ||
                      queue.status === "in_progress"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <span>{getStatusBadge(queue.status!)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={queuePage.paging.total_pages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Queue;
