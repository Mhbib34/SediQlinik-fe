"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import { isErrorResponse } from "@/utils/error-response";
import PageLoader from "@/components/fragment/PageLoader";
import { useDoctorStore } from "@/store/doctor-store";
import { useAppointmentStore } from "@/store/appointment-store";
import { AppointmentPage } from "@/types/appointment";
import AppointmentTab from "./components/tabs/AppointmentTab";
import Dashboard from "./components/tabs/Dashboard";
import Header from "./components/Header";
import AppointmentTable from "./components/AppointmentTable";
import Pagination from "@/components/fragment/Paginations";
import PatientTab from "./components/tabs/PatientTab";
import QueuePage from "./components/tabs/QueueTab";
import DoctorTab from "./components/tabs/DoctorTab";
import SettingsTab from "./components/tabs/SettingsTab";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("activeTab") || "dashboard";
    }
    return "dashboard";
  });
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDoctor, setFilterDoctor] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("activeTab", activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    try {
      fetchDoctorPage(1);
      (async () => {
        const all = await fetchAppointmentPage(currentPage);
        setAppointments(all);
      })();
    } catch (error) {
      isErrorResponse(error, "Logout failed. Please try again.");
    }
    //eslint-disable-next-line
  }, [currentPage]);

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
            currentPage={currentPage}
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
          <DoctorTab getStatusBadge={getStatusBadge} doctorsPage={doctorPage} />
        )}

        {activeTab === "queue" && <QueuePage />}

        {activeTab === "settings" && <SettingsTab />}
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
