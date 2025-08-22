import { RefreshCcw } from "lucide-react";
import React from "react";

const ButtonRefresh = ({ refresh }: { refresh: () => void }) => {
  return (
    <button
      onClick={refresh}
      className="flex cursor-pointer items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <RefreshCcw className="w-4 h-4" />
      <span>Refresh</span>
    </button>
  );
};

export default ButtonRefresh;
