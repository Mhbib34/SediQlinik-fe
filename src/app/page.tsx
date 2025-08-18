"use client";
import React, { useState } from "react";
import {
  Calendar,
  Users,
  Clock,
  Activity,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  DollarSign,
  BarChart3,
  UserCheck,
  Stethoscope,
  Phone,
  Mail,
  Filter,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  Check,
  AlertCircle,
  Home,
  Building2,
  CreditCard,
  Shield,
  Menu,
} from "lucide-react";

interface Appointment {
  id: string;
  patient: string;
  patientId: string;
  doctor: string;
  time: string;
  date: string;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  type: string;
  phone: string;
  notes?: string;
}

interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  address: string;
  lastVisit: string;
  totalVisits: number;
  status: "active" | "inactive";
}

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

  const [appointments] = useState<Appointment[]>([
    {
      id: "APT001",
      patient: "Budi Santoso",
      patientId: "P001",
      doctor: "Dr. Sarah Wijaya",
      time: "09:00",
      date: "2025-08-18",
      status: "scheduled",
      type: "Konsultasi Umum",
      phone: "081234567890",
      notes: "Pasien mengeluh sakit kepala",
    },
    {
      id: "APT002",
      patient: "Siti Aminah",
      patientId: "P002",
      doctor: "Dr. Ahmad Hidayat",
      time: "10:30",
      date: "2025-08-18",
      status: "in-progress",
      type: "Pemeriksaan Rutin",
      phone: "081234567891",
    },
    {
      id: "APT003",
      patient: "Andi Wijaya",
      patientId: "P003",
      doctor: "Dr. Sarah Wijaya",
      time: "14:00",
      date: "2025-08-18",
      status: "scheduled",
      type: "Follow Up",
      phone: "081234567892",
    },
    {
      id: "APT004",
      patient: "Maya Sari",
      patientId: "P004",
      doctor: "Dr. Lisa Pratama",
      time: "15:30",
      date: "2025-08-18",
      status: "completed",
      type: "Konsultasi Spesialis",
      phone: "081234567893",
    },
    {
      id: "APT005",
      patient: "Rizki Pratama",
      patientId: "P005",
      doctor: "Dr. Ahmad Hidayat",
      time: "16:00",
      date: "2025-08-18",
      status: "cancelled",
      type: "Vaksinasi",
      phone: "081234567894",
    },
  ]);

  const [patients] = useState<Patient[]>([
    {
      id: "P001",
      name: "Budi Santoso",
      phone: "081234567890",
      email: "budi@email.com",
      age: 35,
      gender: "Laki-laki",
      address: "Jl. Merdeka No. 123, Medan",
      lastVisit: "2025-08-15",
      totalVisits: 5,
      status: "active",
    },
    {
      id: "P002",
      name: "Siti Aminah",
      phone: "081234567891",
      email: "siti@email.com",
      age: 28,
      gender: "Perempuan",
      address: "Jl. Sudirman No. 456, Medan",
      lastVisit: "2025-08-18",
      totalVisits: 12,
      status: "active",
    },
    {
      id: "P003",
      name: "Andi Wijaya",
      phone: "081234567892",
      email: "andi@email.com",
      age: 42,
      gender: "Laki-laki",
      address: "Jl. Ahmad Yani No. 789, Medan",
      lastVisit: "2025-08-10",
      totalVisits: 8,
      status: "active",
    },
    {
      id: "P004",
      name: "Maya Sari",
      phone: "081234567893",
      email: "maya@email.com",
      age: 31,
      gender: "Perempuan",
      address: "Jl. Gatot Subroto No. 321, Medan",
      lastVisit: "2025-08-18",
      totalVisits: 3,
      status: "active",
    },
    {
      id: "P005",
      name: "Rizki Pratama",
      phone: "081234567894",
      email: "rizki@email.com",
      age: 25,
      gender: "Laki-laki",
      address: "Jl. Diponegoro No. 654, Medan",
      lastVisit: "2025-07-30",
      totalVisits: 2,
      status: "inactive",
    },
  ]);

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

  const stats = [
    {
      title: "Total Appointment Hari Ini",
      value: "24",
      icon: Calendar,
      color: "bg-emerald-500",
      change: "+12%",
    },
    {
      title: "Pasien Terdaftar",
      value: "1,256",
      icon: Users,
      color: "bg-blue-500",
      change: "+5%",
    },
    {
      title: "Appointment Pending",
      value: "8",
      icon: Clock,
      color: "bg-amber-500",
      change: "-2%",
    },
    {
      title: "Revenue Bulan Ini",
      value: "Rp 45M",
      icon: DollarSign,
      color: "bg-green-500",
      change: "+18%",
    },
  ];

  const notifications = [
    {
      id: 1,
      message: "Appointment baru dari Budi Santoso",
      time: "5 menit lalu",
      type: "appointment",
    },
    {
      id: 2,
      message: "Dr. Ahmad telah menyelesaikan konsultasi",
      time: "15 menit lalu",
      type: "completed",
    },
    {
      id: 3,
      message: "Pembayaran dari Maya Sari berhasil",
      time: "1 jam lalu",
      type: "payment",
    },
    {
      id: 4,
      message: "Jadwal Dr. Lisa diperbarui",
      time: "2 jam lalu",
      type: "schedule",
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      available: "bg-green-100 text-green-800 border-green-200",
      busy: "bg-red-100 text-red-800 border-red-200",
      off: "bg-gray-100 text-gray-800 border-gray-200",
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

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "appointments", label: "Appointment", icon: Calendar },
    { id: "patients", label: "Pasien", icon: Users },
    { id: "doctors", label: "Dokter", icon: Stethoscope },
    { id: "reports", label: "Laporan", icon: BarChart3 },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28">
            {/* Logo dan Brand */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3 ">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">
                    MediCare Admin
                  </h1>
                  <p className="text-xs text-slate-500">
                    Sistem Manajemen Klinik
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? "text-emerald-600 bg-emerald-50 shadow-sm"
                      : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* Right Side Menu */}
            <div className="flex items-center space-x-3 ml-2">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari pasien, dokter, appointment..."
                  className="pl-10 pr-4 py-2 w-64 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white placeholder:text-emerald-600"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                    3
                  </span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">
                        Notifikasi
                      </h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
                        >
                          <p className="text-sm text-slate-800">
                            {notif.message}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {notif.time}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-200">
                      <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">
                        Lihat Semua Notifikasi
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-2 p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-slate-800">
                      Admin Klinik
                    </p>
                    <p className="text-xs text-slate-500">admin@klinik.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full transition-colors">
                      <User className="w-4 h-4" />
                      <span>Profil Saya</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full transition-colors">
                      <Settings className="w-4 h-4" />
                      <span>Pengaturan</span>
                    </button>
                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full transition-colors">
                      <Shield className="w-4 h-4" />
                      <span>Keamanan</span>
                    </button>
                    <hr className="my-2 border-slate-200" />
                    <button className="flex items-center space-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full transition-colors">
                      <LogOut className="w-4 h-4" />
                      <span>Keluar</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Hamburger menu */}
              <div className="sm:hidden">
                <button
                  // onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  <Menu className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">Dashboard</h2>
                <p className="text-slate-600 mt-1">
                  Ringkasan aktivitas klinik hari ini
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </button>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Hari ini</p>
                  <p className="text-lg font-semibold text-slate-800">
                    Senin, 18 Agustus 2025
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${
                        stat.change.startsWith("+")
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.change}
                    </span>
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
                    <span className="text-slate-700">
                      Buat Appointment Baru
                    </span>
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
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Dokter Hari Ini
                </h3>
                <div className="space-y-3">
                  {doctors.slice(0, 3).map((doctor) => (
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
                      {getStatusBadge(doctor.status)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">
                  Appointment Mendatang
                </h3>
                <div className="space-y-3">
                  {appointments
                    .filter((apt) => apt.status === "scheduled")
                    .slice(0, 3)
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-800">
                            {appointment.patient}
                          </p>
                          <p className="text-xs text-slate-500">
                            {appointment.time} - {appointment.doctor}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">
                            {appointment.type}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Recent Appointments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Appointment Terbaru
                  </h3>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Lihat Semua
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-slate-200">
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        ID
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        Pasien
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        Dokter
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        Waktu
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        Status
                      </th>
                      <th className="px-6 py-3 text-sm font-medium text-slate-600">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((appointment) => (
                      <tr
                        key={appointment.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {appointment.id}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-800">
                          {appointment.patient}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {appointment.doctor}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {appointment.time}
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(appointment.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "appointments" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Manajemen Appointment
                </h2>
                <p className="text-slate-600 mt-1">
                  Kelola semua appointment pasien
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Buat Appointment</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Filter:
                  </span>
                </div>
                <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Semua Status</option>
                  <option>Terjadwal</option>
                  <option>Berlangsung</option>
                  <option>Selesai</option>
                  <option>Dibatalkan</option>
                </select>
                <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Semua Dokter</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
                <input
                  type="date"
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-200">
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          ID
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Pasien
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Kontak
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Dokter
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Waktu
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Jenis
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Status
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 text-sm text-slate-600">
                            {appointment.id}
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {appointment.patient}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {appointment.patientId}
                              </p>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-2">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span className="text-sm text-slate-600">
                                {appointment.phone}
                              </span>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {appointment.doctor}
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {appointment.time}
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {appointment.type}
                          </td>
                          <td className="py-4">
                            {getStatusBadge(appointment.status)}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-1">
                              <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "patients" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Data Pasien
                </h2>
                <p className="text-slate-600 mt-1">
                  Kelola informasi pasien klinik
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Import Pasien</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Pasien</span>
                </button>
              </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-slate-200">
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          ID
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Nama Lengkap
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Kontak
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Usia
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Gender
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Kunjungan Terakhir
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Total Kunjungan
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Status
                        </th>
                        <th className="pb-3 text-sm font-medium text-slate-600">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr
                          key={patient.id}
                          className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                        >
                          <td className="py-4 text-sm text-slate-600">
                            {patient.id}
                          </td>
                          <td className="py-4">
                            <div>
                              <p className="text-sm font-medium text-slate-800">
                                {patient.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {patient.address}
                              </p>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-600">
                                  {patient.phone}
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-600">
                                  {patient.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {patient.age} tahun
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {patient.gender}
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {patient.lastVisit}
                          </td>
                          <td className="py-4 text-sm text-slate-600">
                            {patient.totalVisits}x
                          </td>
                          <td className="py-4">
                            {getStatusBadge(patient.status)}
                          </td>
                          <td className="py-4">
                            <div className="flex items-center space-x-1">
                              <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

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

        {activeTab === "reports" && (
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

        {activeTab === "billing" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-slate-800">
                  Billing & Pembayaran
                </h2>
                <p className="text-slate-600 mt-1">
                  Kelola transaksi dan pembayaran
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Invoice</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Buat Invoice</span>
                </button>
              </div>
            </div>

            {/* Billing Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      Revenue Hari Ini
                    </p>
                    <p className="text-2xl font-bold text-slate-800">Rp 2.4M</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      Invoice Pending
                    </p>
                    <p className="text-2xl font-bold text-slate-800">12</p>
                  </div>
                  <div className="p-3 bg-amber-100 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      Pembayaran Lunas
                    </p>
                    <p className="text-2xl font-bold text-slate-800">89%</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Check className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">
                      Revenue Bulan Ini
                    </p>
                    <p className="text-2xl font-bold text-slate-800">Rp 45M</p>
                  </div>
                  <div className="p-3 bg-emerald-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              <div className="px-6 py-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-800">
                  Transaksi Terbaru
                </h3>
              </div>
              <div className="p-6">
                <div className="text-center text-slate-500 py-8">
                  <CreditCard className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                  <p>Data transaksi akan ditampilkan di sini</p>
                </div>
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
