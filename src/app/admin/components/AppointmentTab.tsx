import { AppointmentPage } from "@/types/appointment";
import { Doctor } from "@/types/doctor";
import { Format } from "@/utils/format";
import {
  Download,
  Edit,
  Eye,
  Filter,
  Phone,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
} from "lucide-react";
import React from "react";

type Props = {
  doctors: Doctor[];
  todayAppointments: AppointmentPage;
  getStatusBadge: (status: string) => React.ReactNode;
};

const AppointmentTab = ({
  doctors,
  todayAppointments,
  getStatusBadge,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">
            Manajemen Appointment
          </h2>
          <p className="text-slate-600 mt-1">Kelola semua appointment pasien</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Buat Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter:</span>
          </div>
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Semua Status</option>
            <option>Terjadwal</option>
            <option>Berlangsung</option>
            <option>Selesai</option>
            <option>Dibatalkan</option>
          </select>
          <select className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
            <option>Semua Dokter</option>
            {doctors.map((doctor) => (
              <option key={doctor.id}>{doctor.name}</option>
            ))}
          </select>
          <input
            type="date"
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-separate border-spacing-x-6 border-spacing-y-3">
              <thead>
                <tr className="text-left border-b border-slate-200">
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Pasien
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Kontak
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Dokter
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Waktu
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Tanggal
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Keluhan
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Status
                  </th>
                  <th className="pb-3 text-sm font-medium text-slate-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments?.data.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4">
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {appointment.patient.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-600">
                          {appointment.patient.phone}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {appointment.doctor.name}
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {appointment.appointment_time.slice(0, 5)}
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {Format.formatDate(appointment.appointment_date)}
                    </td>
                    <td className="py-4 text-sm text-slate-600">
                      {appointment.complaint}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(appointment.status)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-1">
                        <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTab;
