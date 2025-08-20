"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Clock,
  Settings,
  Plus,
  Eye,
  Edit,
  DollarSign,
  BarChart3,
  UserCheck,
  Stethoscope,
  Phone,
  Mail,
  Check,
  AlertCircle,
  Building2,
  Shield,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import { isErrorResponse } from "@/utils/error-response";
import PageLoader from "@/components/fragment/PageLoader";
import axiosInstance from "@/lib/axiosInstance";
import { useDoctorStore } from "@/store/doctor-store";
import { useAppointmentStore } from "@/store/appointment-store";
import { AppointmentPage } from "@/types/appointment";
import AppointmentTab from "./components/AppointmentTab";
import Dashboard, { Queue } from "./components/Dashboard";
import Header from "./components/Header";
import AppointmentTable from "./components/AppointmentTable";
import Pagination from "@/components/fragment/Paginations";
import PatientTab from "./components/PatientTab";

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  phone: string;
  email: string;
  schedule: string;
  patients: number;
  status: "available" | "busy" | "off";
  experience: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDoctor, setFilterDoctor] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [todayAppointments, setTodayAppointments] = useState<
    AppointmentPage | undefined
  >(undefined);

  const [appointments, setAppointments] = useState<AppointmentPage | undefined>(
    undefined
  );

  const { loading } = useAuthStore(
    useShallow((state) => {
      return {
        loading: state.loading,
      };
    })
  );
  const { doctorPage, fetchDoctorPage } = useDoctorStore(
    useShallow((state) => {
      return {
        doctorPage: state.doctorPage,
        fetchDoctorPage: state.fetchDoctorPage,
      };
    })
  );
  const { fetchAppointmentPage } = useAppointmentStore(
    useShallow((state) => {
      return {
        fetchAppointmentPage: state.fetchAppointmentPage,
      };
    })
  );

  const [stats, setStats] = useState<Queue>({
    doctors_on_duty: 0,
    queue_stats: {
      completed: 0,
      in_progress: 0,
      waiting: 0,
      total_queues: 0,
    },
    today: {
      cancelled_appointments: 0,
      completed_appointments: 0,
      pending_appointments: 0,
      total_appointments: 0,
    },
  });

  useEffect(() => {
    try {
      const fetchStats = async () => {
        const res = await axiosInstance.get("/v1/dashboard/stats", {
          withCredentials: true,
        });
        setStats(res.data.data);
        console.log(res.data.data);
      };
      fetchStats();
      fetchDoctorPage(1);
      (async () => {
        const today = await fetchAppointmentPage(1, {
          appointment_date: new Date().toISOString().split("T")[0],
        });
        setTodayAppointments(today);
        const all = await fetchAppointmentPage(currentPage);
        setAppointments(all);
      })();
    } catch (error) {
      isErrorResponse(error, "Logout failed. Please try again.");
    }
    //eslint-disable-next-line
  }, [currentPage]);

  const [doctors] = useState<Doctor[]>([
    {
      id: "D001",
      name: "Dr. Sarah Wijaya",
      specialization: "Dokter Umum",
      phone: "081234567800",
      email: "sarah@klinik.com",
      schedule: "Senin-Jumat 08:00-16:00",
      patients: 45,
      status: "available",
      experience: "8 tahun",
    },
    {
      id: "D002",
      name: "Dr. Ahmad Hidayat",
      specialization: "Dokter Anak",
      phone: "081234567801",
      email: "ahmad@klinik.com",
      schedule: "Senin-Sabtu 09:00-17:00",
      patients: 38,
      status: "busy",
      experience: "12 tahun",
    },
    {
      id: "D003",
      name: "Dr. Lisa Pratama",
      specialization: "Dokter Kandungan",
      phone: "081234567802",
      email: "lisa@klinik.com",
      schedule: "Selasa-Sabtu 10:00-18:00",
      patients: 28,
      status: "available",
      experience: "6 tahun",
    },
    {
      id: "D004",
      name: "Dr. Rahman Surya",
      specialization: "Dokter Gigi",
      phone: "081234567803",
      email: "rahman@klinik.com",
      schedule: "Senin-Jumat 13:00-21:00",
      patients: 32,
      status: "off",
      experience: "10 tahun",
    },
  ]);

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      available: "bg-green-100 text-green-800 border-green-200",
      busy: "bg-red-100 text-red-800 border-red-200",
      off: "bg-gray-100 text-gray-800 border-gray-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      wating: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    const statusText = {
      scheduled: "Terjadwal",
      completed: "Selesai",
      cancelled: "Dibatalkan",
      "in-progress": "Berlangsung",
      active: "Aktif",
      inactive: "Tidak Aktif",
      available: "Tersedia",
      busy: "Sibuk",
      off: "Libur",
      pending: "Terjadwal",
      wating: "Menunggu",
      confirmed: "Dikonfirmasi",
    };

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {statusText[status as keyof typeof statusText]}
      </span>
    );
  };

  const filteredAppointments = appointments?.data.filter((appointment) => {
    const statusMatch =
      filterStatus === "all" || appointment.status === filterStatus;

    const doctorMatch =
      filterDoctor === "all" || appointment.doctor.name === filterDoctor;

    return statusMatch && doctorMatch;
  });

  if (loading) return <PageLoader />;
  console.log(appointments);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Header
        setActiveTab={setActiveTab}
        activeTab={activeTab}
        setShowNotifications={setShowNotifications}
        showNotifications={showNotifications}
        setShowProfileDropdown={setShowProfileDropdown}
        showProfileDropdown={showProfileDropdown}
      />
      {/* Main Content */}
      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            stats={stats}
            todayAppointments={todayAppointments?.data ?? []}
            doctorPage={doctorPage}
            getStatusBadge={getStatusBadge}
          >
            <AppointmentTable
              setActiveTab={setActiveTab}
              appointmentPage={appointments!}
              getStatusBadge={getStatusBadge}
            />
          </Dashboard>
        )}

        {activeTab === "appointments" && (
          <AppointmentTab
            doctors={doctorPage.data}
            todayAppointments={filteredAppointments!}
            getStatusBadge={getStatusBadge}
            filterStatus={filterStatus!}
            setFilterStatus={setFilterStatus}
            filterDoctor={filterDoctor!}
            setFilterDoctor={setFilterDoctor}
          >
            <Pagination
              currentPage={appointments?.paging.current_page ?? 1}
              totalPages={appointments?.paging.total_pages ?? 1}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </AppointmentTab>
        )}

        {activeTab === "patients" && <PatientTab />}

        {activeTab === "doctors" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Data Dokter
                </h2>
                <p className="text-slate-600 mt-1">
                  Kelola informasi dokter dan jadwal praktik
                </p>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Tambah Dokter</span>
              </button>
            </div>

            {/* Doctors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Stethoscope className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-slate-600">
                          {doctor.specialization}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(doctor.status)}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {doctor.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {doctor.email}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {doctor.schedule}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        {doctor.patients} pasien aktif
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserCheck className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-600">
                        Pengalaman: {doctor.experience}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-slate-200">
                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Detail</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "queue" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Laporan & Analitik
              </h2>
              <p className="text-slate-600 mt-1">
                Lihat statistik dan laporan klinik
              </p>
            </div>

            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Laporan Harian
                    </h3>
                    <p className="text-sm text-slate-600">Aktivitas hari ini</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Lihat Laporan
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Laporan Keuangan
                    </h3>
                    <p className="text-sm text-slate-600">
                      Revenue & pengeluaran
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Lihat Laporan
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Laporan Pasien
                    </h3>
                    <p className="text-sm text-slate-600">Statistik pasien</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Lihat Laporan
                </button>
              </div>
            </div>

            {/* Chart Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
              <div className="text-center text-slate-500">
                <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  Grafik Analitik
                </h3>
                <p className="text-slate-500">
                  Grafik dan chart akan ditampilkan di sini
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                Pengaturan Sistem
              </h2>
              <p className="text-slate-600 mt-1">
                Konfigurasi dan pengaturan klinik
              </p>
            </div>

            {/* Settings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Informasi Klinik
                    </h3>
                    <p className="text-sm text-slate-600">
                      Profil dan kontak klinik
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  Kelola Profil Klinik
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Manajemen User
                    </h3>
                    <p className="text-sm text-slate-600">
                      Admin dan staff klinik
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  Kelola User
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      Pengaturan Sistem
                    </h3>
                    <p className="text-sm text-slate-600">
                      Konfigurasi aplikasi
                    </p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  Buka Pengaturan
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Keamanan</h3>
                    <p className="text-sm text-slate-600">Password dan akses</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  Pengaturan Keamanan
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">
                  Status Sistem
                </h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">
                      Server Status
                    </h4>
                    <p className="text-sm text-green-600">Online</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">Database</h4>
                    <p className="text-sm text-green-600">Terhubung</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                    <h4 className="font-semibold text-slate-800">Backup</h4>
                    <p className="text-sm text-amber-600">Perlu Update</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors flex items-center justify-center">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Click outside handlers */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        ></div>
      )}
      {showNotifications && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowNotifications(false)}
        ></div>
      )}
    </div>
  );
};

export default AdminDashboard;
