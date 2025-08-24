import Pagination from "@/components/fragment/Paginations";
import { QueuePage } from "@/types/queue";
import { Format } from "@/utils/format";
import { getCurrentTime } from "@/utils/time";
import { Calendar, Filter, Search, User } from "lucide-react";
import React from "react";

type Props = {
  queuePage: QueuePage;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

const Queue = ({ queuePage, currentPage, setCurrentPage }: Props) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Semua Antrian Hari Ini
          </h2>
          <p className="text-sm text-slate-500">{getCurrentTime()}</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari pasien..."
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-6">
          <div className="space-y-4">
            {queuePage.data.map((queue) => (
              <div
                key={queue.id}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">
                      {queue.appointment?.patient_name}
                    </h4>
                    <p className="text-sm text-slate-600">
                      {queue.appointment?.complaint}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-slate-500 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {Format.formatDate(queue.queue_date!)}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        Nomor Antrian : {queue.queue_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700 transition-colors cursor-pointer">
                      Panggil
                    </button>
                    <button className="px-3 py-1 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition-colors cursor-pointer">
                      Selesai
                    </button>
                    <button className="px-3 py-1 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors cursor-pointer">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={queuePage.paging.total_pages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Queue;
