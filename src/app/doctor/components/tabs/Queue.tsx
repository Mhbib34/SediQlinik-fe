import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipForward,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  RefreshCw,
  UserCheck,
  Calendar,
  Activity,
} from "lucide-react";
import Pagination from "@/components/fragment/Paginations";
import { Format } from "@/utils/format";
import { showSuccess } from "@/lib/sonner";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { socket } from "@/lib/socket";
import { Doctor } from "@/types/doctor";
import { QueuePage, RealtimeQueue } from "@/types/queue";
import { getWithMidnight, setWithMidnight } from "@/utils/resetTime";

type Props = {
  queuePage: QueuePage;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  getStatusBadge: (status: string) => React.ReactNode;
  fetchQueuePage: (page: number) => Promise<QueuePage | undefined>;
  user_id: string;
};

const Queue = ({
  queuePage,
  currentPage,
  setCurrentPage,
  getStatusBadge,
  fetchQueuePage,
  user_id,
}: Props) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [queues, setQueues] = useState<RealtimeQueue>({
    called_at: new Date(),
    id: "",
    next_queue: 0,
    queue_number: 0,
    patient_name: "",
  });
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

  useEffect(() => {
    const savedQueues = getWithMidnight("queues");
    if (savedQueues) {
      setQueues(savedQueues);
    }
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/v1/doctors/${user_id}`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    socket.on("queue_called", (data) => {
      console.log("Queue updated (from FE):", data);
      setQueues(data);
      setWithMidnight("queues", data);
    });

    return () => {
      socket.off("queue_called");
    };
  }, []);

  // Join room ketika doctor sudah diketahui
  useEffect(() => {
    if (doctor?.id) {
      console.log("Joining room doctor_", doctor.id);
      socket.emit("join_room", { doctor_id: doctor.id });
    }
  }, [doctor]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dashboard Antrian
              </h1>
              <p className="text-gray-600 mt-1">
                {doctor?.name} - {doctor?.specialization}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Queue Controls & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Queue Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4">Kontrol Antrian</h2>

              <div className="text-center mb-6">
                <div className="text-8xl font-bold text-blue-600 mb-2">
                  {queues?.queue_number}
                </div>
                <div className="text-lg text-gray-600">Nomor Saat Ini</div>
              </div>
            </div>

            {/* Current Patient */}
            {queues.patient_name && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Pasien Saat Ini</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      {queues.patient_name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Nomor: {queues.queue_number}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCompletedPatient(queues.id)}
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Selesai
                    </button>
                    <button
                      onClick={() => handleSkipPatient(queues.id)}
                      className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
                    >
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                      Tidak Hadir
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Statistik Hari Ini</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Total Pasien</span>
                  </div>
                  <span className="font-semibold">{queuePage.data.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">Selesai</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {
                      queuePage.data.filter((apt) => apt.status === "completed")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Tidak Hadir</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {
                      queuePage.data.filter((apt) => apt.status === "cancelled")
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">Menunggu</span>
                  </div>
                  <span className="font-semibold text-blue-600">
                    {
                      queuePage.data.filter((apt) => apt.status === "waiting")
                        .length
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Patient Queue */}
          <div className="lg:col-span-2 overflow-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Daftar Antrian Pasien</h2>
                <button
                  onClick={() => window.location.reload()}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              <div className="space-y-3">
                {queuePage.data.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Tidak ada pasien dalam antrian</p>
                  </div>
                ) : (
                  queuePage.data.map((queue, index) => (
                    <div
                      key={queue.id}
                      className={`p-4 rounded-lg border transition-all ${
                        index === 0
                          ? "border-blue-200 bg-blue-50"
                          : "border-gray-200 bg-white hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-gray-900">
                            {queue.queue_number}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {queue.appointment?.patient_name}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <span>{getStatusBadge(queue.status!)}</span>
                              <span className="text-xs text-gray-500">
                                Daftar: {Format.formatDate(queue.created_at!)} :{" "}
                                {Format.formatTime(queue.created_at!)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {queue.status === "waiting" && (
                            <button
                              onClick={() => handleCalledPatient(queue.id)}
                              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                            >
                              <UserCheck className="w-3 h-3 inline mr-1" />
                              Panggil
                            </button>
                          )}
                          {queue.status === "in_progress" && (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                              Dipanggil
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={queuePage.paging.total_pages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Queue;
