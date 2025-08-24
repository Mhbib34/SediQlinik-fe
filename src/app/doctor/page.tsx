"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  FileText,
  Bell,
  User,
  LogOut,
  Search,
  Filter,
  Phone,
  Mail,
} from "lucide-react";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sample data
  const todayAppointments = [
    {
      id: 1,
      time: "09:00",
      patient: "John Doe",
      type: "Konsultasi Umum",
      status: "confirmed",
    },
    {
      id: 2,
      time: "10:30",
      patient: "Jane Smith",
      type: "Follow Up",
      status: "confirmed",
    },
    {
      id: 3,
      time: "14:00",
      patient: "Robert Johnson",
      type: "Pemeriksaan Rutin",
      status: "pending",
    },
    {
      id: 4,
      time: "15:30",
      patient: "Sarah Wilson",
      type: "Konsultasi",
      status: "confirmed",
    },
    {
      id: 5,
      time: "16:45",
      patient: "Michael Brown",
      type: "Check Up",
      status: "pending",
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      date: "2025-08-19",
      time: "09:00",
      patient: "Emily Davis",
      type: "Konsultasi",
      phone: "+62 812-3456-7890",
    },
    {
      id: 2,
      date: "2025-08-19",
      time: "11:00",
      patient: "David Lee",
      type: "Follow Up",
      phone: "+62 813-4567-8901",
    },
    {
      id: 3,
      date: "2025-08-20",
      time: "10:00",
      patient: "Lisa Chen",
      type: "Pemeriksaan",
      phone: "+62 814-5678-9012",
    },
    {
      id: 4,
      date: "2025-08-20",
      time: "14:30",
      patient: "Mark Anderson",
      type: "Konsultasi",
      phone: "+62 815-6789-0123",
    },
  ];

  const patientRecords = [
    {
      id: 1,
      name: "John Doe",
      lastVisit: "2025-08-15",
      diagnosis: "Hipertensi",
      age: 45,
    },
    {
      id: 2,
      name: "Jane Smith",
      lastVisit: "2025-08-14",
      diagnosis: "Diabetes Type 2",
      age: 52,
    },
    {
      id: 3,
      name: "Robert Johnson",
      lastVisit: "2025-08-12",
      diagnosis: "Gastritis",
      age: 38,
    },
    {
      id: 4,
      name: "Sarah Wilson",
      lastVisit: "2025-08-10",
      diagnosis: "Migrain",
      age: 29,
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Hari Ini</p>
              <p className="text-2xl font-bold text-slate-900">
                {todayAppointments.length}
              </p>
              <p className="text-xs text-slate-500">Appointment</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-slate-900">
                {
                  todayAppointments.filter((apt) => apt.status === "pending")
                    .length
                }
              </p>
              <p className="text-xs text-slate-500">Konfirmasi</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Total Pasien</p>
              <p className="text-2xl font-bold text-slate-900">1,247</p>
              <p className="text-xs text-slate-500">Bulan ini</p>
            </div>
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Appointment Hari Ini
          </h3>
          <p className="text-sm text-slate-600">Senin, 18 Agustus 2025</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {appointment.patient}
                    </h4>
                    <p className="text-sm text-slate-600">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-slate-900">
                      {appointment.time}
                    </p>
                    <span
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Lihat Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Semua Appointment</h2>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pasien..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {appointment.patient}
                    </h4>
                    <p className="text-sm text-slate-600">{appointment.type}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {appointment.date}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {appointment.phone}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-slate-900">
                      {appointment.time}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition-colors">
                      Terima
                    </button>
                    <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-md text-sm hover:bg-slate-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderPatients = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Data Pasien</h2>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari pasien..."
            className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="space-y-4">
            {patientRecords.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {patient.name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      Umur: {patient.age} tahun
                    </p>
                    <p className="text-xs text-slate-500">
                      Kunjungan terakhir: {patient.lastVisit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {patient.diagnosis}
                    </p>
                    <p className="text-xs text-slate-500">Diagnosis terakhir</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Lihat Rekam Medis
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Jadwal Praktik</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Jadwal Mingguan
          </h3>
          <div className="space-y-3">
            {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"].map(
              (day, index) => (
                <div
                  key={day}
                  className="flex justify-between items-center p-3 border border-slate-200 rounded-lg"
                >
                  <span className="font-medium text-slate-900">{day}</span>
                  <span className="text-slate-600">08:00 - 16:00</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs">
                    Aktif
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
              + Blokir Waktu
            </button>
            <button className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors">
              + Set Waktu Libur
            </button>
            <button className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors">
              + Ubah Jadwal Harian
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Profil Doctor</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Dr. Ahmad Santoso
            </h3>
            <p className="text-slate-600">Dokter Umum</p>
            <p className="text-sm text-slate-500 mt-2">STR: 446/2019</p>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-1" />
                  <span>ahmad@klinik.com</span>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4 text-sm text-slate-600 mt-2">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>+62 812-3456-7890</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Informasi Profil
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value="Dr. Ahmad Santoso, Sp.PD"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Spesialisasi
                </label>
                <input
                  type="text"
                  value="Dokter Umum"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  No. STR
                </label>
                <input
                  type="text"
                  value="446/2019"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tahun Pengalaman
                </label>
                <input
                  type="text"
                  value="8 Tahun"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={4}
                  value="Dokter umum berpengalaman dengan fokus pada pelayanan kesehatan preventif dan pengobatan penyakit umum. Menangani berbagai kasus mulai dari check-up rutin hingga penanganan penyakit kronis."
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                Batal
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-slate-900">MediCare</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                Doctor
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "appointments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>Appointments</span>
              </button>
              <button
                onClick={() => setActiveTab("patients")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "patients"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Pasien</span>
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "schedule"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Jadwal</span>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900">
                    Dr. Ahmad
                  </p>
                  <p className="text-xs text-slate-500">Dokter Umum</p>
                </div>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <User className="w-4 h-4" />
                </button>
                <button className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-slate-200">
        <div className="flex overflow-x-auto">
          {[
            { id: "dashboard", icon: Calendar, label: "Dashboard" },
            { id: "appointments", icon: Clock, label: "Appointments" },
            { id: "patients", icon: Users, label: "Pasien" },
            { id: "schedule", icon: FileText, label: "Jadwal" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 px-4 py-3 min-w-max ${
                activeTab === item.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "appointments" && renderAppointments()}
        {activeTab === "patients" && renderPatients()}
        {activeTab === "schedule" && renderSchedule()}
        {activeTab === "profile" && renderProfile()}
      </main>
    </div>
  );
};

export default DoctorDashboard;
