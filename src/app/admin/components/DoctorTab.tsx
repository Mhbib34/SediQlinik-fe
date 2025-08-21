import { DoctorPage, Doctor } from "@/types/doctor";
import { Format } from "@/utils/format";
import {
  Clock,
  Edit,
  Eye,
  Mail,
  Phone,
  Plus,
  Stethoscope,
  Users2,
  WorkflowIcon,
} from "lucide-react";
import React, { useState } from "react";
import AddDoctorModal from "./AddDoctorModal";
import DoctorDetailModal from "./DoctorDetailModal";
import EditDoctorModal from "./EditDoctorModal";

type Props = {
  getStatusBadge: (status: string) => React.ReactNode;
  doctorsPage: DoctorPage;
};

const DoctorTab = ({ getStatusBadge, doctorsPage }: Props) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleViewDetail = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailModalOpen(true);
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Data Dokter</h2>
          <p className="text-slate-600 mt-1">
            Kelola informasi dokter dan jadwal praktik
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Dokter</span>
        </button>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctorsPage.data.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {doctor.name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {doctor.specialization}
                  </p>
                </div>
              </div>
              {getStatusBadge(doctor.status!)}
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Users2 className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{doctor.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{doctor.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">{doctor.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <WorkflowIcon className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {Format.formatDayOfWeek(doctor.day_of_week!)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600">
                  {doctor.start_time?.slice(0, 5)} -{" "}
                  {doctor.end_time?.slice(0, 5)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-slate-200">
              <button
                onClick={() => handleViewDetail(doctor)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>Detail</span>
              </button>
              <button
                onClick={() => handleEditDoctor(doctor)}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {isAddModalOpen && <AddDoctorModal setIsOpen={setIsAddModalOpen} />}
      {isDetailModalOpen && selectedDoctor && (
        <DoctorDetailModal
          doctor={selectedDoctor}
          setIsOpen={setIsDetailModalOpen}
          getStatusBadge={getStatusBadge}
        />
      )}
      {isEditModalOpen && selectedDoctor && (
        <EditDoctorModal
          doctor={selectedDoctor}
          setIsOpen={setIsEditModalOpen}
        />
      )}
    </div>
  );
};

export default DoctorTab;
