import React from "react";
import {
  X,
  Stethoscope,
  Mail,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Award,
  Users2,
  Heart,
  Activity,
  Shield,
  Star,
} from "lucide-react";
import { Doctor } from "@/types/doctor";
import { Format } from "@/utils/format";

type Props = {
  doctor: Doctor;
  setIsOpen: (open: boolean) => void;
  getStatusBadge: (status: string) => React.ReactNode;
};

const DoctorDetailModal = ({ doctor, setIsOpen, getStatusBadge }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-6 py-8">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all z-10 group cursor-pointer"
          >
            <X className="w-5 h-5 group-hover:rotate-180 group-hover:text-red-600 transition-all" />
          </button>

          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-4 right-8 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>

          <div className="relative flex items-center space-x-6">
            {/* Doctor Avatar */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Stethoscope className="w-10 h-10 text-white" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">
                {doctor.name}
              </h1>
              <p className="text-emerald-100 text-lg mb-3">
                {doctor.specialization}
              </p>
              <div className="flex items-center space-x-3">
                {getStatusBadge(doctor.status!)}
                <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-yellow-300" />
                  <span className="text-white text-sm font-medium">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Users2 className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Informasi Kontak
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium text-slate-800">
                        {doctor.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Telepon</p>
                      <p className="font-medium text-slate-800">
                        {doctor.phone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Jadwal Praktik
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Hari Praktik</p>
                      <p className="font-medium text-slate-800">
                        {Format.formatDayOfWeek(doctor.day_of_week!)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Jam Praktik</p>
                      <p className="font-medium text-slate-800">
                        {doctor.start_time?.slice(0, 5)} -{" "}
                        {doctor.end_time?.slice(0, 5)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Informasi Tambahan
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">ID Dokter</p>
                      <p className="font-medium text-slate-800">
                        DOC-{doctor.id}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Heart className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Pengalaman</p>
                      <p className="font-medium text-slate-800">5+ Tahun</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Stats */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <Activity className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Statistik</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-emerald-100 text-sm">Total Pasien</p>
                    <p className="text-2xl font-bold">1,247</p>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm">Rating</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl font-bold">4.8</span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-current text-yellow-300"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-emerald-100 text-sm">Konsultasi</p>
                    <p className="text-2xl font-bold">342</p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-slate-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Lokasi Praktik
                  </h3>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-slate-800">
                    RS. Sehat Sentosa
                  </p>
                  <p className="text-sm text-slate-600">
                    Jl. Kesehatan No. 123
                  </p>
                  <p className="text-sm text-slate-600">
                    Medan, Sumatera Utara
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetailModal;
