import { showConfirm } from "@/lib/sonner";
import { User } from "@/types/user";
import { isErrorResponse } from "@/utils/error-response";
import { Calendar, Clock, FileText, LogOut, User2 } from "lucide-react";
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
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-slate-900">SediQlinik</span>
            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              Doctor
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("antrian")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                activeTab === "antrian"
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Antrian</span>
            </button>
            <button
              onClick={() => setActiveTab("schedule")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
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
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User2 className="w-4 h-4 text-blue-600" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-900">
                  {user?.name}
                </p>
              </div>
              <button
                onClick={() =>
                  showConfirm(
                    "Keluar",
                    "Apakah anda yakin ingin keluar?",
                    () => handleLogout(),
                    "Keluar"
                  )
                }
                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
