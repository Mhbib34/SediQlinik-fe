import React, { useState, useEffect } from "react";
import {
  Users,
  Clock,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  UserCheck,
  Calendar,
  Timer,
} from "lucide-react";
import { useQueueStore } from "@/store/queue-store";
import { useShallow } from "zustand/shallow";
import { Queue, QueueStatus } from "@/types/queue";
import Pagination from "@/components/fragment/Paginations";
import { useDebouncedValue } from "@/utils/useDebounce";
import { Format } from "@/utils/format";
import { showError, showSuccess } from "@/lib/sonner";
import ButtonRefresh from "@/components/fragment/ButtonRefresh";
import { getCurrentTime } from "@/utils/time";

const QueuePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<QueueStatus | "all">("all");
  const [selectedQueue, setSelectedQueue] = useState<Queue | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const useDebouncedSearchTerm = useDebouncedValue(searchTerm, 500);

  const { queuePage, fetchQueuePage, loading, queueStats, fetchQueueStats } =
    useQueueStore(
      useShallow((state) => ({
        queuePage: state.queuePage,
        fetchQueuePage: state.fetchQueuePage,
        loading: state.loading,
        queueStats: state.queueStats,
        fetchQueueStats: state.fetchQueueStats,
      }))
    );

  useEffect(() => {
    fetchQueuePage(currentPage, {
      doctor_name: useDebouncedSearchTerm,
      patient_name: useDebouncedSearchTerm,
    });
    fetchQueueStats();
    // eslint-disable-next-line
  }, [currentPage, useDebouncedSearchTerm]);

  const getStatusBadge = (status: string) => {
    const configs = {
      waiting: {
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
        icon: <Clock className="w-3 h-3" />,
        text: "Menunggu",
      },
      in_progress: {
        color: "bg-blue-100 text-blue-800 border-blue-200",
        icon: <UserCheck className="w-3 h-3" />,
        text: "Sedang Dilayani",
      },
      completed: {
        color: "bg-green-100 text-green-800 border-green-200",
        icon: <CheckCircle className="w-3 h-3" />,
        text: "Selesai",
      },
      cancelled: {
        color: "bg-red-100 text-red-800 border-red-200",
        icon: <XCircle className="w-3 h-3" />,
        text: "Dibatalkan",
      },
      skipped: {
        color: "bg-gray-100 text-gray-800 border-gray-200",
        icon: <AlertCircle className="w-3 h-3" />,
        text: "Dilewati",
      },
    };

    const config = configs[status as QueueStatus];
    return (
      <div
        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
      >
        {config.icon}
        <span>{config.text}</span>
      </div>
    );
  };

  const filteredQueue = queuePage.data.filter((item) => {
    const term = useDebouncedSearchTerm.toLowerCase();

    const matchesSearch =
      item.doctor?.doctor_name?.toLowerCase().includes(term) ||
      item.appointment?.patient_name?.toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewDetail = (queue: Queue) => {
    setSelectedQueue(queue);
    setShowDetailModal(true);
  };

  const handleRefresh = () => {
    try {
      fetchQueuePage(currentPage);
      showSuccess("Data berhasil di refresh");
    } catch (error) {
      console.log(error);
      showError("Data gagal di refresh");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Antrian Hari Ini
            </h1>
            <p className="text-slate-600 flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{getCurrentTime()}</span>
            </p>
          </div>
          <ButtonRefresh refresh={handleRefresh} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Antrian Hari Ini</p>
              <p className="text-2xl font-bold text-slate-800">
                {queueStats.queue_stats.total_queues}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Menunggu</p>
              <p className="text-2xl font-bold text-yellow-600">
                {queueStats.queue_stats.waiting}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Sedang Dilayani</p>
              <p className="text-2xl font-bold text-blue-600">
                {queueStats.queue_stats.in_progress}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Selesai</p>
              <p className="text-2xl font-bold text-green-600">
                {queueStats.queue_stats.completed}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Dibatalkan</p>
              <p className="text-2xl font-bold text-red-600">
                {queueStats.queue_stats.cancelled}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari pasien, nomor antrian, atau dokter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-600" />
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as QueueStatus | "all")
              }
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Semua Status</option>
              <option value="waiting">Menunggu</option>
              <option value="in_progress">Sedang Dilayani</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </div>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            Daftar Antrian ({filteredQueue.length})
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-slate-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Memuat data antrian...</span>
            </div>
          </div>
        ) : filteredQueue.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500">
            <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
            <p className="text-lg font-medium mb-2">Tidak ada antrian</p>
            <p className="text-sm">Belum ada pasien yang mendaftar hari ini</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredQueue.map((queue) => (
              <div
                key={queue.id}
                className="p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Queue Number */}
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {queue.queue_number}
                    </div>

                    {/* Patient Info */}
                    <div>
                      <h3 className="font-semibold text-slate-800 text-lg mb-1">
                        {queue.appointment?.patient_name}
                      </h3>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Stethoscope className="w-4 h-4" />
                          <span>{queue.doctor?.doctor_name}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>
                            Jadwal: {Format.formatDate(queue.queue_date!)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      {getStatusBadge(queue.status!)}
                      {queue.estimated_duration &&
                        queue.status === "waiting" && (
                          <div className="flex items-center space-x-1 mt-2 text-sm text-slate-500">
                            <Timer className="w-3 h-3" />
                            <span>
                              {`>`}
                              {queue.estimated_duration} menit
                            </span>
                          </div>
                        )}
                    </div>

                    <button
                      onClick={() => handleViewDetail(queue)}
                      className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {queue.notes && (
                  <div className="mt-3 pl-20">
                    <div className="bg-slate-100 rounded-lg p-3">
                      <p className="text-sm text-slate-600">
                        <span className="font-medium">Catatan:</span>{" "}
                        {queue.notes}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={queuePage.paging.total_pages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* Detail Modal */}
      {showDetailModal && selectedQueue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowDetailModal(false)}
          />
          <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl">
            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all"
              >
                <XCircle className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                  {selectedQueue.queue_number}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedQueue.appointment?.patient_name}
                  </h2>
                  <p className="text-emerald-100">Detail Antrian</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Status
                  </label>
                  <div className="mt-1">
                    {getStatusBadge(selectedQueue.status!)}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Dokter
                  </label>
                  <p className="text-slate-800">
                    {selectedQueue.doctor?.doctor_name}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Jadwal
                  </label>
                  <p className="text-slate-800">
                    {Format.formatDate(selectedQueue.queue_date!)}
                  </p>
                </div>
              </div>

              {selectedQueue.notes && (
                <div>
                  <label className="text-sm font-medium text-slate-600">
                    Catatan
                  </label>
                  <p className="text-slate-800 bg-slate-50 p-3 rounded-lg mt-1">
                    {selectedQueue.notes}
                  </p>
                </div>
              )}

              {selectedQueue.estimated_duration &&
                selectedQueue.status === "waiting" && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-yellow-800">
                      <Timer className="w-5 h-5" />
                      <span className="font-medium">
                        Estimasi Waktu Tunggu: {`>`}
                        {selectedQueue.estimated_duration} menit
                      </span>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QueuePage;
