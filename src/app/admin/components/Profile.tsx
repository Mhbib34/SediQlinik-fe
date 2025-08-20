import { showConfirm } from "@/lib/sonner";
import { User } from "@/types/user";
import { ChevronDown, LogOut, Settings, Shield, User2 } from "lucide-react";
import React from "react";

type ProfileProps = {
  setShowProfileDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  showProfileDropdown: boolean;
  user: User | null;
  handleLogout: () => void;
};

const Profile = ({
  setShowProfileDropdown,
  showProfileDropdown,
  user,
  handleLogout,
}: ProfileProps) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        className="flex items-center space-x-2 p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
      >
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <User2 className="w-4 h-4 text-white" />
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-slate-800">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>
        <ChevronDown className="w-4 h-4" />
      </button>

      {showProfileDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <button className="flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 w-full transition-colors">
            <User2 className="w-4 h-4" />
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
          <button
            onClick={() =>
              showConfirm(
                "Keluar",
                "Apakah anda yakin ingin keluar?",
                () => handleLogout(),
                "Keluar"
              )
            }
            className="flex items-center space-x-3 px-4 py-2 text-sm text-red-700 hover:bg-red-50 w-full transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Keluar</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
