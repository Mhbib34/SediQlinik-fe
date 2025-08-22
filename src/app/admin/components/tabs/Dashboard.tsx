import { useAppointmentStore } from "@/store/appointment-store";
import { useQueueStore } from "@/store/queue-store";
import { AppointmentPage } from "@/types/appointment";
import { DoctorPage } from "@/types/doctor";
import { isErrorResponse } from "@/utils/error-response";
import {
  AlertCircle,
  AppWindow,
  AppWindowMacIcon,
  CheckCircle,
  FileText,
  Plus,
  Stethoscope,
  UserCheck,
  Users,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

type Props = {
  currentPage: number;
  doctorPage: DoctorPage;
  getStatusBadge: (status: string) => React.ReactNode;
  children?: React.ReactNode;
};

const Dashboard = ({
  doctorPage,
  getStatusBadge,
  children,
  currentPage,
}: Props) => {
  const { queueStats, fetchQueueStats } = useQueueStore(
    useShallow((state) => {
      return {
        queueStats: state.queueStats,
        fetchQueueStats: state.fetchQueueStats,
      };
    })
  );
  const { fetchAppointmentPage } = useAppointmentStore(
    useShallow((state) => ({
      fetchAppointmentPage: state.fetchAppointmentPage,
    }))
  );
  const [todayAppointments, setTodayAppointments] = useState<
    AppointmentPage | undefined
  >(undefined);

  useEffect(() => {
    fetchQueueStats();
    try {
      const fetchTodayAppointments = async () => {
        const today = await fetchAppointmentPage(currentPage, {
          appointment_date: new Date().toISOString().split("T")[0],
        });
        setTodayAppointments(today);
      };
      fetchTodayAppointments();
    } catch (error) {
      isErrorResponse(error, "Failed to fetch today's appointments.");
    }
    // eslint-disable-next-line
  }, [currentPage]);

  const currentDate = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const StatsCard = [
    {
      title: "Total Antrian Selesai Hari Ini",
      value: queueStats?.queue_stats?.completed ?? 0,
      icon: CheckCircle,
      color: "bg-emerald-500",
    },
    {
      title: "Total Doctor Aktif Hari Ini",
      value: queueStats?.doctors_on_duty ?? 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Appointment Hari Ini",
      value: queueStats?.today?.total_appointments ?? 0,
      icon: AppWindowMacIcon,
      color: "bg-amber-500",
    },
    {
      title: "Total Antrian Hari Ini",
      value: queueStats?.queue_stats?.total_queues ?? 0,
      icon: AppWindow,
      color: "bg-green-500",
    },
  ];
  return (
    <div className="sm:space-y-8">
      {/* Header */}
      <div className="flex flex-row justify-between items-end sm:items-center sm:space-y-0 mb-5">
        <div className="w-1/2 sm:w-auto ">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Dashboard
          </h2>
          <p className="text-slate-600 mt-1 text-sm sm:text-base">
            Ringkasan aktivitas klinik hari ini
          </p>
        </div>
        <div className="text-right w-1/2 sm:w-auto">
          <p className="text-sm text-slate-500">Hari ini</p>
          <p className="text-lg font-semibold text-slate-800">{currentDate}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {StatsCard.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-800 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Aksi Cepat
          </h3>
          <div className="space-y-3">
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
              <Plus className="w-5 h-5 text-emerald-500" />
              <span className="text-slate-700">Buat Appointment Baru</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
              <UserCheck className="w-5 h-5 text-blue-500" />
              <span className="text-slate-700">Daftar Pasien Baru</span>
            </button>
            <button className="flex items-center space-x-3 w-full p-3 text-left hover:bg-slate-50 rounded-lg transition-colors">
              <FileText className="w-5 h-5 text-purple-500" />
              <span className="text-slate-700">Lihat Laporan</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Dokter</h3>
          <div className="space-y-3">
            {doctorPage.data.slice(0, 5).map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>
                {getStatusBadge(doctor.status!)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">
            Appointment Hari Ini
          </h3>
          <div className="space-y-3">
            {todayAppointments?.data.slice(0, 5).map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {appointment.patient.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {appointment.appointment_time.slice(0, 5)} -{" "}
                    {appointment.doctor.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">
                    {appointment.doctor.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {todayAppointments?.data.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-slate-500">
              <AlertCircle className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-lg font-medium mb-2">Tidak ada appointment</p>
              <p className="text-sm">
                Belum ada pasien yang mendaftar hari ini
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Appointments Table */}
      {children}
    </div>
  );
};

export default Dashboard;
