import { QueuePage } from "@/types/queue";
import { Calendar, CheckCircle, Users } from "lucide-react";
import React from "react";

const QueueStats = ({ queuePage }: { queuePage: QueuePage }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Statistik Hari Ini</h3>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Total Pasien</span>
          </div>
          <span className="font-semibold">{queuePage.data.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 ">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Selesai</span>
          </div>
          <span className="font-semibold text-green-600">
            {queuePage.data.filter((apt) => apt.status === "completed").length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Tidak Hadir</span>
          </div>
          <span className="font-semibold text-blue-600">
            {queuePage.data.filter((apt) => apt.status === "cancelled").length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Menunggu</span>
          </div>
          <span className="font-semibold text-blue-600">
            {queuePage.data.filter((apt) => apt.status === "waiting").length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QueueStats;
