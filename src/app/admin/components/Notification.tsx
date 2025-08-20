import { Bell } from "lucide-react";
import React from "react";

type NotificationProps = {
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  showNotifications: boolean;
};

const Notification = ({
  setShowNotifications,
  showNotifications,
}: NotificationProps) => {
  const notifications = [
    {
      id: 1,
      message: "Appointment baru dari Budi Santoso",
      time: "5 menit lalu",
      type: "appointment",
    },
    {
      id: 2,
      message: "Dr. Ahmad telah menyelesaikan konsultasi",
      time: "15 menit lalu",
      type: "completed",
    },
    {
      id: 3,
      message: "Pembayaran dari Maya Sari berhasil",
      time: "1 jam lalu",
      type: "payment",
    },
    {
      id: 4,
      message: "Jadwal Dr. Lisa diperbarui",
      time: "2 jam lalu",
      type: "schedule",
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-slate-600 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
          3
        </span>
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-slate-200">
            <h3 className="font-semibold text-slate-800">Notifikasi</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className="px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
              >
                <p className="text-sm text-slate-800">{notif.message}</p>
                <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
