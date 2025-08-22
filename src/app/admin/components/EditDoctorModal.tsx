import React, { useState } from "react";
import {
  X,
  Save,
  Stethoscope,
  Calendar,
  Clock,
  ToggleLeft,
  ToggleRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Doctor } from "@/types/doctor";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { useDoctorStore } from "@/store/doctor-store";
import { useShallow } from "zustand/shallow";

type Props = {
  doctor: Doctor;
  setIsOpen: (open: boolean) => void;
};

type EditDoctorData = {
  day_of_week: string[];
  start_time: string;
  end_time: string;
  is_active: boolean;
  status?: string;
};

const dayOptions = [
  { value: "Monday", label: "Senin" },
  { value: "Tuesday", label: "Selasa" },
  { value: "Wednesday", label: "Rabu" },
  { value: "Thursday", label: "Kamis" },
  { value: "Friday", label: "Jumat" },
  { value: "Saturday", label: "Sabtu" },
  { value: "Sunday", label: "Minggu" },
];

const EditDoctorModal = ({ doctor, setIsOpen }: Props) => {
  const [formData, setFormData] = useState<EditDoctorData>({
    day_of_week: Array.isArray(doctor.day_of_week)
      ? doctor.day_of_week
      : doctor.day_of_week
      ? [doctor.day_of_week]
      : [],
    start_time: doctor.start_time || "08:00",
    end_time: doctor.end_time || "17:00",
    is_active: doctor.is_active === true,
    status: doctor.status,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { fetchDoctorPage } = useDoctorStore(
    useShallow((state) => {
      return {
        fetchDoctorPage: state.fetchDoctorPage,
      };
    })
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.day_of_week || formData.day_of_week.length === 0) {
      newErrors.day_of_week = "Minimal pilih satu hari praktik";
    }

    if (!formData.start_time) {
      newErrors.start_time = "Jam mulai harus diisi";
    }

    if (!formData.end_time) {
      newErrors.end_time = "Jam selesai harus diisi";
    }

    if (formData.start_time && formData.end_time) {
      if (formData.start_time >= formData.end_time) {
        newErrors.end_time = "Jam selesai harus lebih besar dari jam mulai";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      let res;
      if (doctor.day_of_week !== null) {
        res = await axiosInstance.put(
          `/v1/doctors/${doctor.id}/schedule/${doctor.schedule_id}`,
          formData
        );
      } else if (doctor.day_of_week === null) {
        res = await axiosInstance.post(
          `/v1/doctors/${doctor.id}/schedule`,
          formData
        );
      }
      showSuccess(res?.data.message);
      setIsOpen(false);
      fetchDoctorPage(1);
    } catch (error) {
      console.error("Error updating doctor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    field: keyof EditDoctorData,
    value: string | boolean | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDayToggle = (dayValue: string) => {
    setFormData((prev) => {
      const currentDays = [...prev.day_of_week];
      const dayIndex = currentDays.indexOf(dayValue);

      if (dayIndex > -1) {
        // Remove day if already selected
        currentDays.splice(dayIndex, 1);
      } else {
        // Add day if not selected
        currentDays.push(dayValue);
      }

      return {
        ...prev,
        day_of_week: currentDays,
      };
    });

    // Clear error when user selects days
    if (errors.day_of_week) {
      setErrors((prev) => ({
        ...prev,
        day_of_week: "",
      }));
    }
  };

  const getDayLabel = (days: string[]) => {
    if (days.length === 0) return "Tidak ada hari dipilih";
    if (days.length === 7) return "Setiap hari";

    return days
      .map((day) => dayOptions.find((d) => d.value === day)?.label)
      .join(", ");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-slideUp">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-500 via-emerald-500 to-teal-500 px-6 py-6">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all z-10 group cursor-pointer"
          >
            <X className="w-5 h-5 group-hover:rotate-180 group-hover:text-red-600 transition-all" />
          </button>

          {/* Decorative elements */}
          <div className="absolute top-2 left-8 w-12 h-12 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-2 right-12 w-16 h-16 bg-white/5 rounded-full blur-2xl"></div>

          <div className="relative flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Edit Dokter</h1>
              <p className="text-blue-100">
                {doctor.name} - {doctor.specialization}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Day of Week - Multiple Selection */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>Hari Praktik</span>
                <span className="text-xs text-slate-500">
                  (pilih satu atau lebih)
                </span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {dayOptions.map((day) => {
                  const isSelected = formData.day_of_week.includes(day.value);
                  return (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => handleDayToggle(day.value)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border-2 ${
                        isSelected
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/25"
                          : "bg-white text-slate-600 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>

              {formData.day_of_week.length > 0 && (
                <div className="mt-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                  <p className="text-sm text-emerald-700">
                    Dipilih:{" "}
                    <span className="font-medium">
                      {getDayLabel(formData.day_of_week)}
                    </span>
                  </p>
                </div>
              )}

              {errors.day_of_week && (
                <div className="flex items-center space-x-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.day_of_week}</span>
                </div>
              )}
            </div>

            {/* Time Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Start Time */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Jam Mulai</span>
                </label>
                <input
                  type="time"
                  value={formData.start_time}
                  onChange={(e) =>
                    handleInputChange("start_time", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                    errors.start_time
                      ? "border-red-300 bg-red-50"
                      : "border-slate-300"
                  }`}
                />
                {errors.start_time && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.start_time}</span>
                  </div>
                )}
              </div>

              {/* End Time */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span>Jam Selesai</span>
                </label>
                <input
                  type="time"
                  value={formData.end_time}
                  onChange={(e) =>
                    handleInputChange("end_time", e.target.value)
                  }
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                    errors.end_time
                      ? "border-red-300 bg-red-50"
                      : "border-slate-300"
                  }`}
                />
                {errors.end_time && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.end_time}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Is Active Toggle */}
            <div className="space-y-3">
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                {formData.is_active ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <span>Status Aktif</span>
              </label>

              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    handleInputChange("is_active", !formData.is_active)
                  }
                  className={`relative inline-flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    formData.is_active
                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
                      : "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
                  }`}
                >
                  {formData.is_active ? (
                    <ToggleRight className="w-5 h-5 mr-2" />
                  ) : (
                    <ToggleLeft className="w-5 h-5 mr-2" />
                  )}
                  {formData.is_active ? "Aktif" : "Tidak Aktif"}
                </button>

                <div className="flex-1">
                  <p className="text-sm text-slate-600">
                    {formData.is_active
                      ? "Dokter dapat menerima pasien dan jadwal aktif"
                      : "Dokter tidak dapat menerima pasien baru"}
                  </p>
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-slate-700">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Status Jadwal</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all ${
                  errors.status
                    ? "border-red-300 bg-red-50"
                    : "border-slate-300"
                }`}
              >
                <option value="available">Tersedia</option>
                <option value="active">Aktif</option>
                <option value="inactive">Tidak Aktif</option>
                <option value="scheduled">Terjadwal</option>
                <option value="off">Tidak Tersedia</option>
                <option value="busy">Sibuk</option>
              </select>
            </div>

            {/* Preview */}
            <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200">
              <h4 className="font-medium text-slate-800 mb-3">
                Preview Jadwal:
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  <span className="text-slate-600">
                    {getDayLabel(formData.day_of_week)}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-slate-600">
                    {formData.start_time} - {formData.end_time}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-teal-600" />
                  <span className="text-slate-600">
                    {formData.status?.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {formData.is_active ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={
                      formData.is_active ? "text-green-600" : "text-red-600"
                    }
                  >
                    Status: {formData.is_active ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition-colors font-medium cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex cursor-pointer items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDoctorModal;
