import { Appointment } from "@/types/appointment";
import { Doctor } from "@/types/doctor";
import { Format } from "@/utils/format";
import { Filter, Phone } from "lucide-react";
import React from "react";
import StatusDropdown from "../AppointmentStatusListBox";

type Props = {
  doctors: Doctor[];
  todayAppointments: Appointment[];
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  filterDoctor: string;
  setFilterDoctor: React.Dispatch<React.SetStateAction<string>>;
  children?: React.ReactNode;
};

const AppointmentTab = ({
  doctors,
  todayAppointments,
  filterStatus,
  setFilterStatus,
  filterDoctor,
  setFilterDoctor,
  children,
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
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">Filter:</span>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Status</option>
            <option value="pending">Terjadwal</option>
            <option value="confirmed">Diproses</option>
            <option value="completed">Selesai</option>
            <option value="cancelled">Dibatalkan</option>
          </select>
          <select
            value={filterDoctor}
            onChange={(e) => setFilterDoctor(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Semua Dokter</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.name}>
                {doctor.name}
              </option>
            ))}
          </select>
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
                </tr>
              </thead>
              <tbody>
                {todayAppointments?.map((appointment) => (
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
                      <StatusDropdown appointment={appointment} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AppointmentTab;
