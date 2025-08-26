"use client";
import React, { useEffect, useState } from "react";
import { User, Search, Phone, Mail } from "lucide-react";
import Headers from "./components/Headers";
import MobileNav from "./components/MobileNav";
import Dashboard from "./components/tabs/Dashboard";
import { useShallow } from "zustand/shallow";
import { useAuthStore } from "@/store/auth-store";
import PageLoader from "@/components/fragment/PageLoader";
import { useQueueStore } from "@/store/queue-store";
import Queue from "./components/tabs/Queue";
import Schedule from "./components/tabs/Schedule";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeTab") || "dashboard";
    }
    return "dashboard";
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { user, logout } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );

  const { queuePage, fetchQueuePage, loading } = useQueueStore(
    useShallow((state) => ({
      queuePage: state.queuePage,
      fetchQueuePage: state.fetchQueuePage,
      loading: state.loading,
    }))
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!user?.name) return;
    fetchQueuePage(currentPage, {
      doctor_name: user.name,
    });
    // eslint-disable-next-line
  }, [user?.name, currentPage]);

  if (loading) return <PageLoader />;

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      scheduled: "bg-blue-100 text-blue-800 border-blue-200",
      completed: "bg-green-100 text-green-800 border-green-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      confirmed: "bg-blue-100 text-blue-800 border-blue-200",
      in_progress: "bg-purple-100 text-purple-800 border-purple-200",
      active: "bg-green-100 text-green-800 border-green-200",
      inactive: "bg-gray-100 text-gray-800 border-gray-200",
      available: "bg-green-100 text-green-800 border-green-200",
      busy: "bg-red-100 text-red-800 border-red-200",
      off: "bg-gray-100 text-gray-800 border-gray-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      waiting: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };

    const statusText = {
      scheduled: "Terjadwal",
      completed: "Selesai",
      cancelled: "Dibatalkan",
      in_progress: "Berlangsung",
      active: "Aktif",
      inactive: "Tidak Aktif",
      available: "Tersedia",
      busy: "Sibuk",
      off: "Libur",
      pending: "Terjadwal",
      waiting: "Menunggu",
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
      <Headers
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        logout={logout}
      />
      {/* Mobile Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Main Content */}
      <main className=" px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            queuePage={queuePage}
            setActiveTab={setActiveTab}
            getStatusBadge={getStatusBadge}
          />
        )}
        {activeTab === "antrian" && (
          <Queue
            queuePage={queuePage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            getStatusBadge={getStatusBadge}
            fetchQueuePage={fetchQueuePage}
            user_id={user!.id}
          />
        )}
        {activeTab === "schedule" && (
          <Schedule user_id={user!.id} getStatusBadge={getStatusBadge} />
        )}
        {activeTab === "profile" && renderProfile()}
      </main>
    </div>
  );
};

export default DoctorDashboard;
