import { QueuePage } from "@/types/queue";
import { Format } from "@/utils/format";
import { UserCheck, Users } from "lucide-react";
import React from "react";

type Props = {
  queuePage: QueuePage;
  getStatusBadge: (status: string) => React.ReactNode;
  handleCalledPatient: (id: string) => void;
};

const QueuePatientTable = ({
  queuePage,
  getStatusBadge,
  handleCalledPatient,
}: Props) => {
  return (
    <div className="lg:col-span-2 overflow-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Daftar Antrian Pasien</h2>
        </div>
        <div className="space-y-3">
          {queuePage.data.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Tidak ada pasien dalam antrian</p>
            </div>
          ) : (
            queuePage.data.map((queue, index) => (
              <div
                key={queue.id}
                className={`p-4 rounded-lg border transition-all ${
                  index === 0
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-gray-900">
                      {queue.queue_number}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {queue.appointment?.patient_name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span>{getStatusBadge(queue.status!)}</span>
                        <span className="text-xs text-gray-500">
                          Daftar: {Format.formatDate(queue.created_at!)} :{" "}
                          {Format.formatTime(queue.created_at!)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {queue.status === "waiting" && (
                      <button
                        onClick={() => handleCalledPatient(queue.id)}
                        className="px-3 py-1 cursor-pointer bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                      >
                        <UserCheck className="w-3 h-3 inline mr-1" />
                        Panggil
                      </button>
                    )}
                    {queue.status === "in_progress" && (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm font-medium">
                        Dipanggil
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default QueuePatientTable;
