import { Calendar, Clock, FileText, Users } from "lucide-react";
import React from "react";
type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const MobileNav = ({ activeTab, setActiveTab }: Props) => {
  return (
    <div className="md:hidden bg-white border-b border-slate-200">
      <div className="flex overflow-x-auto">
        {[
          { id: "dashboard", icon: Calendar, label: "Dashboard" },
          { id: "antrian", icon: Clock, label: "Antrian" },
          { id: "patients", icon: Users, label: "Pasien" },
          { id: "schedule", icon: FileText, label: "Jadwal" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 px-4 py-3 min-w-max cursor-pointer ${
              activeTab === item.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-slate-600"
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
