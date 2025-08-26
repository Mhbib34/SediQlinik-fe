import { RealtimeQueue } from "@/types/queue";
import { AlertCircle, CheckCircle } from "lucide-react";
import React from "react";

type Props = {
  queues: RealtimeQueue;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSkipPatient: (id: string) => void;
};

const QueuePatientInfo = ({ queues, setIsOpen, handleSkipPatient }: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold mb-4">Pasien Saat Ini</h3>
      <div className="space-y-3">
        <div>
          <div className="font-medium text-gray-900">{queues.patient_name}</div>
          <div className="text-sm text-gray-600">
            Nomor: {queues.queue_number}
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 px-3 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
          >
            <CheckCircle className="w-4 h-4 inline mr-1" />
            Selesai
          </button>
          <button
            onClick={() => handleSkipPatient(queues.id)}
            className="flex-1 px-3 py-2 cursor-pointer bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            <AlertCircle className="w-4 h-4 inline mr-1" />
            Tidak Hadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueuePatientInfo;
