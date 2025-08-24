import React from "react";

type Props = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  menuItems: {
    id: string;
    label: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
};

const MobileSidebar = ({ activeTab, setActiveTab, menuItems }: Props) => {
  return (
    <div className="absolute top-0 animate-slideRight left-0 h-screen bg-white w-1/2 flex  space-y-1 flex-col sm:hidden py-5 px-4">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeTab === item.id
              ? "text-emerald-600 bg-emerald-50 shadow-sm"
              : "text-slate-600 hover:text-emerald-600 hover:bg-slate-50"
          }`}
        >
          <item.icon className="w-4 h-4" />
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileSidebar;
