import { AppointmentPage } from "@/types/appointment";
import { Format } from "@/utils/format";
import { Edit, Eye } from "lucide-react";
import React from "react";

type Props = {
  setActiveTab: (tab: string) => void;
  appointmentPage: AppointmentPage;
  getStatusBadge: (status: string) => React.ReactNode;
};
const AppointmentTable = ({
  setActiveTab,
  appointmentPage,
  getStatusBadge,
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200">
      <div className="px-6 py-4 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800">
            Appointment Terbaru
          </h3>
          <button
            onClick={() => setActiveTab("appointments")}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
          >
            Lihat Semua
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-200">
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                ID
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Pasien
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Dokter
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Waktu
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Tanggal
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Status
              </th>
              <th className="px-6 py-3 text-sm font-medium text-slate-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {appointmentPage?.data.slice(0, 5).map((appointment) => (
              <tr
                key={appointment.id}
                className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-slate-600">
                  {appointment.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-slate-800">
                  {appointment.patient.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {appointment.doctor.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {appointment.appointment_time.slice(0, 5)}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {Format.formatDate(appointment.appointment_date)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(appointment.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-1">
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
