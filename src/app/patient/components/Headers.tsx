import { showConfirm } from "@/lib/sonner";
import { User } from "@/types/user";
import { isErrorResponse } from "@/utils/error-response";
import {
  Bell,
  Calendar,
  Clock,
  FileText,
  LogOut,
  Plus,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: User | null;
  logout: () => void;
};

const Headers = ({ activeTab, setActiveTab, user, logout }: Props) => {
  const router = useRouter();
  const handleLogout = () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  };
  return (
    <div>
      <nav className="bg-white shadow-sm border-b border-slate-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold text-slate-900">
                SediQlinik
              </span>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                Patient
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "dashboard"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab("book")}
                className={`flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "book"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Buat Appointment</span>
              </button>
              <button
                onClick={() => setActiveTab("appointments")}
                className={`flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "appointments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>My Appointments</span>
              </button>
              <button
                onClick={() => setActiveTab("records")}
                className={`flex cursor-pointer items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "records"
                    ? "bg-blue-100 text-blue-700"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Rekam Medis</span>
              </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-slate-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500">Patient</p>
                </div>
                <button
                  onClick={() => setActiveTab("profile")}
                  className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <Users className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    showConfirm(
                      "Keluar",
                      "Apakah anda yakin ingin keluar?",
                      () => handleLogout(),
                      "Keluar"
                    )
                  }
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
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
            { id: "dashboard", icon: Calendar, label: "Home" },
            { id: "book", icon: Plus, label: "Book" },
            { id: "appointments", icon: Clock, label: "Appointments" },
            { id: "records", icon: FileText, label: "Records" },
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
    </div>
  );
};

export default Headers;
