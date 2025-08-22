import {
  AlertCircle,
  Building2,
  Check,
  Settings,
  Shield,
  Users,
} from "lucide-react";
import React from "react";

const SettingsTab = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800">Pengaturan Sistem</h2>
        <p className="text-slate-600 mt-1">Konfigurasi dan pengaturan klinik</p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Informasi Klinik</h3>
              <p className="text-sm text-slate-600">Profil dan kontak klinik</p>
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
              <h3 className="font-semibold text-slate-800">Manajemen User</h3>
              <p className="text-sm text-slate-600">Admin dan staff klinik</p>
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
              <p className="text-sm text-slate-600">Konfigurasi aplikasi</p>
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
              <h4 className="font-semibold text-slate-800">Server Status</h4>
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
  );
};

export default SettingsTab;
