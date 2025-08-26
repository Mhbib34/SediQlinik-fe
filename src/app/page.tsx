"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  User,
  Plus,
  Phone,
  Heart,
  Activity,
  Thermometer,
  Weight,
} from "lucide-react";
import Headers from "./patient/components/Headers";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PageLoader from "@/components/fragment/PageLoader";

const PatientDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const { user, logout, loading } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
      loading: state.loading,
    }))
  );

  // Sample data
  const upcomingAppointments = [
    {
      id: 1,
      date: "2025-08-20",
      time: "10:00",
      doctor: "Dr. Ahmad Santoso",
      type: "Konsultasi Umum",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2025-08-25",
      time: "14:30",
      doctor: "Dr. Sarah Indira",
      type: "Follow Up",
      status: "pending",
    },
  ];

  const appointmentHistory = [
    {
      id: 1,
      date: "2025-08-15",
      doctor: "Dr. Ahmad Santoso",
      type: "Check Up",
      diagnosis: "Sehat",
      status: "completed",
    },
    {
      id: 2,
      date: "2025-07-20",
      doctor: "Dr. Sarah Indira",
      type: "Konsultasi",
      diagnosis: "Hipertensi Ringan",
      status: "completed",
    },
    {
      id: 3,
      date: "2025-06-10",
      doctor: "Dr. Ahmad Santoso",
      type: "Pemeriksaan Rutin",
      diagnosis: "Gastritis",
      status: "completed",
    },
  ];

  const availableDoctors = [
    {
      id: 1,
      name: "Dr. Ahmad Santoso",
      specialty: "Dokter Umum",
      rating: 4.8,
      experience: "8 tahun",
      nextAvailable: "2025-08-19",
    },
    {
      id: 2,
      name: "Dr. Sarah Indira",
      specialty: "Spesialis Penyakit Dalam",
      rating: 4.9,
      experience: "12 tahun",
      nextAvailable: "2025-08-20",
    },
    {
      id: 3,
      name: "Dr. Budi Hartono",
      specialty: "Dokter Umum",
      rating: 4.7,
      experience: "5 tahun",
      nextAvailable: "2025-08-19",
    },
    {
      id: 4,
      name: "Dr. Maya Sari",
      specialty: "Spesialis Jantung",
      rating: 4.9,
      experience: "15 tahun",
      nextAvailable: "2025-08-21",
    },
  ];

  const healthMetrics = [
    {
      label: "Tekanan Darah",
      value: "120/80",
      unit: "mmHg",
      icon: Heart,
      color: "emerald",
      date: "2025-08-15",
    },
    {
      label: "Berat Badan",
      value: "70",
      unit: "kg",
      icon: Weight,
      color: "blue",
      date: "2025-08-15",
    },
    {
      label: "Suhu Tubuh",
      value: "36.5",
      unit: "°C",
      icon: Thermometer,
      color: "orange",
      date: "2025-08-15",
    },
    {
      label: "Detak Jantung",
      value: "75",
      unit: "bpm",
      icon: Activity,
      color: "red",
      date: "2025-08-15",
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Selamat Datang, John Doe!</h1>
        <p className="text-blue-100">
          Kelola kesehatan Anda dengan mudah dan praktis
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const colorClasses = {
            emerald: "bg-emerald-100 text-emerald-600",
            blue: "bg-blue-100 text-blue-600",
            orange: "bg-orange-100 text-orange-600",
            red: "bg-red-100 text-red-600",
          };

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    colorClasses[metric.color]
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-sm font-medium text-slate-600">
                {metric.label}
              </h3>
              <p className="text-xl font-bold text-slate-900">
                {metric.value}{" "}
                <span className="text-sm font-normal text-slate-500">
                  {metric.unit}
                </span>
              </p>
              <p className="text-xs text-slate-500">Update: {metric.date}</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-900">
              Appointment Mendatang
            </h3>
            <button
              onClick={() => setActiveTab("book")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Buat Appointment</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">
                Belum ada appointment yang dijadwalkan
              </p>
              <button
                onClick={() => setActiveTab("book")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buat Appointment Sekarang
              </button>
            </div>
          ) : (
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
                        {appointment.doctor}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {appointment.type}
                      </p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-slate-500 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {appointment.date}
                        </span>
                        <span className="text-xs text-slate-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {appointment.status === "confirmed"
                        ? "Confirmed"
                        : "Pending"}
                    </span>
                    <button className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors">
                      Reschedule
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBookAppointment = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Buat Appointment Baru
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Form */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Detail Appointment
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Pilih Dokter
              </label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Pilih dokter...</option>
                {availableDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                min="2025-08-19"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Waktu
              </label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Pilih waktu...</option>
                <option>09:00</option>
                <option>10:00</option>
                <option>11:00</option>
                <option>14:00</option>
                <option>15:00</option>
                <option>16:00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Jenis Konsultasi
              </label>
              <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Pilih jenis konsultasi...</option>
                <option>Konsultasi Umum</option>
                <option>Check Up Rutin</option>
                <option>Follow Up</option>
                <option>Pemeriksaan Khusus</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Keluhan / Catatan
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan keluhan atau alasan kunjungan..."
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Buat Appointment
            </button>
          </div>
        </div>

        {/* Available Doctors */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Dokter Tersedia
          </h3>
          <div className="space-y-4">
            {availableDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {doctor.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {doctor.specialty}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-amber-600">
                          ★ {doctor.rating}
                        </span>
                        <span className="text-xs text-slate-500">
                          • {doctor.experience}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-600">
                      Tersedia
                    </p>
                    <p className="text-xs text-slate-500">
                      {doctor.nextAvailable}
                    </p>
                  </div>
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
        <h2 className="text-2xl font-bold text-slate-900">Appointment Saya</h2>
        <button
          onClick={() => setActiveTab("book")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Baru</span>
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Appointment Mendatang
          </h3>
        </div>
        <div className="p-6">
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">
                Belum ada appointment yang dijadwalkan
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">
                          {appointment.doctor}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {appointment.type}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-slate-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {appointment.date}
                          </span>
                          <span className="text-xs text-slate-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                          appointment.status === "confirmed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "Confirmed"
                          : "Pending"}
                      </span>
                      <button className="px-3 py-1 border border-slate-300 text-slate-700 rounded-md text-sm hover:bg-slate-50 transition-colors">
                        Reschedule
                      </button>
                      <button className="px-3 py-1 border border-red-300 text-red-700 rounded-md text-sm hover:bg-red-50 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Appointment History */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Riwayat Appointment
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {appointmentHistory.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-slate-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">
                        {appointment.doctor}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {appointment.type}
                      </p>
                      <p className="text-xs text-slate-500">
                        {appointment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {appointment.diagnosis}
                    </p>
                    <span className="inline-flex px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMedicalRecords = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Rekam Medis</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Info */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Informasi Pribadi
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">Nama</span>
              <span className="font-medium text-slate-900">John Doe</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Umur</span>
              <span className="font-medium text-slate-900">32 tahun</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Jenis Kelamin</span>
              <span className="font-medium text-slate-900">Laki-laki</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Golongan Darah</span>
              <span className="font-medium text-slate-900">O+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">No. BPJS</span>
              <span className="font-medium text-slate-900">0001234567890</span>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Metrik Kesehatan Terkini
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {healthMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              const colorClasses = {
                emerald: "bg-emerald-100 text-emerald-600",
                blue: "bg-blue-100 text-blue-600",
                orange: "bg-orange-100 text-orange-600",
                red: "bg-red-100 text-red-600",
              };

              return (
                <div
                  key={index}
                  className="p-4 border border-slate-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        colorClasses[metric.color]
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600">
                        {metric.label}
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {metric.value} {metric.unit}
                      </p>
                      <p className="text-xs text-slate-500">{metric.date}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Medical History */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900">
            Riwayat Medis
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {appointmentHistory.map((record) => (
              <div
                key={record.id}
                className="p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {record.type}
                    </h4>
                    <p className="text-sm text-slate-600">
                      Dokter: {record.doctor}
                    </p>
                    <p className="text-sm text-slate-600">
                      Diagnosis: {record.diagnosis}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-slate-900">
                      {record.date}
                    </p>
                    <button className="mt-2 text-xs text-blue-600 hover:text-blue-800">
                      Lihat Detail
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

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Profil Saya</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">John Doe</h3>
            <p className="text-slate-600">Patient ID: PT001234</p>
            <p className="text-sm text-slate-500 mt-2">
              Member sejak Januari 2024
            </p>
            <button className="mt-4 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg text-sm hover:bg-slate-50 transition-colors">
              Ganti Foto
            </button>
          </div>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Informasi Pribadi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value="John Doe"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value="john.doe@email.com"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  No. Telepon
                </label>
                <input
                  type="tel"
                  value="+62 812-3456-7890"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value="1992-05-15"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>Laki-laki</option>
                  <option>Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Golongan Darah
                </label>
                <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option>O+</option>
                  <option>O-</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Alamat
                </label>
                <textarea
                  rows={3}
                  value="Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta 10270"
                  className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Alergi / Riwayat Penyakit
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan alergi obat, makanan, atau riwayat penyakit penting..."
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

      {/* Emergency Contact */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Kontak Darurat
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Kontak Darurat
            </label>
            <input
              type="text"
              value="Jane Doe"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Hubungan
            </label>
            <select className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Istri</option>
              <option>Suami</option>
              <option>Orang Tua</option>
              <option>Anak</option>
              <option>Saudara</option>
              <option>Teman</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              No. Telepon
            </label>
            <input
              type="tel"
              value="+62 813-7890-1234"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value="jane.doe@email.com"
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <PageLoader />;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Headers */}
      <Headers
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        logout={logout}
      />

      {/* Main Content */}
      <main className=" px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "book" && renderBookAppointment()}
        {activeTab === "appointments" && renderAppointments()}
        {activeTab === "records" && renderMedicalRecords()}
        {activeTab === "profile" && renderProfile()}
      </main>

      {/* Floating Emergency Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-all hover:scale-110 flex items-center justify-center">
          <Phone className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default PatientDashboard;
