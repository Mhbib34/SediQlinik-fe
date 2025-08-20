import React, { Dispatch } from "react";
import Notification from "./Notification";
import Profile from "./Profile";
import {
  Activity,
  Calendar,
  Home,
  Menu,
  PanelsTopLeft,
  Settings,
  Stethoscope,
  Users,
} from "lucide-react";
import { isErrorResponse } from "@/utils/error-response";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";

type Props = {
  setActiveTab: (tab: string) => void;
  activeTab: string;
  setShowProfileDropdown: Dispatch<React.SetStateAction<boolean>>;
  showProfileDropdown: boolean;
  setShowNotifications: Dispatch<React.SetStateAction<boolean>>;
  showNotifications: boolean;
};

const Header = ({
  setActiveTab,
  activeTab,
  setShowNotifications,
  showNotifications,
  setShowProfileDropdown,
  showProfileDropdown,
}: Props) => {
  const [open, setOpen] = React.useState(false);
  const { user, logout } = useAuthStore(
    useShallow((state) => {
      return {
        user: state.user,
        logout: state.logout,
      };
    })
  );
  const router = useRouter();
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "appointments", label: "Appointment", icon: Calendar },
    { id: "patients", label: "Pasien", icon: Users },
    { id: "doctors", label: "Dokter", icon: Stethoscope },
    { id: "queue", label: "Antrian", icon: PanelsTopLeft },
    { id: "settings", label: "Pengaturan", icon: Settings },
  ];

  const handleLogout = () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  };
  return (
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
          <div className="flex items-center space-x-2 ">
            {/* Notifications */}
            <Notification
              setShowNotifications={setShowNotifications}
              showNotifications={showNotifications}
            />
            {/* Profile Dropdown */}
            <Profile
              setShowProfileDropdown={setShowProfileDropdown}
              showProfileDropdown={showProfileDropdown}
              user={user}
              handleLogout={handleLogout}
            />

            {/* Hamburger menu */}
            <div className="sm:hidden" onClick={() => setOpen(!open)}>
              <button
                // onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Sidebar */}
            {open && (
              <div className="absolute top-0 animate-slideRight left-0 h-screen bg-white w-1/2 flex  space-y-1 flex-col sm:hidden py-5 px-4">
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
