"use client";
import React, { useEffect, useState } from "react";
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
        {user && activeTab === "dashboard" && (
          <Dashboard
            queuePage={queuePage}
            setActiveTab={setActiveTab}
            getStatusBadge={getStatusBadge}
          />
        )}
        {user && activeTab === "antrian" && (
          <Queue
            queuePage={queuePage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            getStatusBadge={getStatusBadge}
            fetchQueuePage={fetchQueuePage}
            user_id={user.id}
          />
        )}
        {user && activeTab === "schedule" && (
          <Schedule user_id={user.id} getStatusBadge={getStatusBadge} />
        )}
      </main>
    </div>
  );
};

export default DoctorDashboard;
