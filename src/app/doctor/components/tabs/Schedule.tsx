import EditDoctorModal from "@/app/admin/components/EditDoctorModal";
import axiosInstance from "@/lib/axiosInstance";
import { showWarning } from "@/lib/sonner";
import { Doctor } from "@/types/doctor";
import { useEffect, useState } from "react";

type Props = {
  user_id: string;
  getStatusBadge: (status: string) => React.ReactNode;
};

const Schedule = ({ user_id, getStatusBadge }: Props) => {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axiosInstance.get(`/v1/doctors/${user_id}`, {
          withCredentials: true,
        });
        console.log(res.data.data);
        setDoctor(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDoctor();
    // eslint-disable-next-line
  }, [doctor]);
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Jadwal Praktik</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Schedule Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Jadwal Mingguan
          </h3>
          <div className="space-y-3">
            {doctor?.day_of_week?.map((day, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 border border-slate-200 rounded-lg"
              >
                <span className="font-medium text-slate-900">{day}</span>
                <span className="text-slate-600">
                  {doctor?.start_time} - {doctor?.end_time}
                </span>
                <span>{getStatusBadge(doctor.status!)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => showWarning("Fitur belum tersedia")}
              className="w-full p-4 border-2 border-dashed border-blue-300 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
            >
              + Blokir Waktu
            </button>
            <button
              onClick={() => showWarning("Fitur belum tersedia")}
              className="w-full p-4 border-2 border-dashed border-emerald-300 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              + Set Waktu Libur
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="w-full p-4 border-2 border-dashed border-purple-300 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
            >
              + Ubah Jadwal Harian
            </button>
          </div>
        </div>
      </div>

      {isOpen && <EditDoctorModal doctor={doctor!} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Schedule;
