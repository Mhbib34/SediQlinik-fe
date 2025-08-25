import { QueuePage } from "@/types/queue";
import { Format } from "@/utils/format";
import { getCurrentTime } from "@/utils/time";
import { Calendar, Clock, User2 } from "lucide-react";

type Props = {
  setActiveTab: (tab: string) => void;
  queuePage: QueuePage;
  getStatusBadge: (status: string) => React.ReactNode;
};
const Dashboard = ({ setActiveTab, queuePage, getStatusBadge }: Props) => {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Hari Ini</p>
              <p className="text-2xl font-bold text-slate-900">
                {queuePage.data.length}
              </p>
              <p className="text-xs text-slate-500">Antrian</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm font-medium">Menunggu</p>
              <p className="text-2xl font-bold text-slate-900">
                {
                  queuePage.data.filter((apt) => apt.status === "waiting")
                    .length
                }
              </p>
              <p className="text-xs text-slate-500">Konfirmasi</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6 flex justify-between items-center border-b border-slate-200">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Antrian Hari Ini
            </h3>
            <p className="text-sm text-slate-600">{getCurrentTime()}</p>
          </div>
          <div>
            <button
              onClick={() => setActiveTab("antrian")}
              className="text-sm font-medium text-blue-500 cursor-pointer hover:text-blue-600 transition-all"
            >
              Lihat Semua
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {queuePage.data.slice(0, 5).map((queue) => (
              <div
                key={queue.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {queue.appointment?.patient_name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      Nomor Antrian: {queue.queue_number}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium text-slate-900">
                      {Format.formatDate(queue.queue_date!)}
                    </p>
                    <span>{getStatusBadge(queue.status!)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {queuePage.data.length === 0 && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-slate-600">
                Tidak ada Antrian hari ini
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
