import RegisterPage from "@/app/(main)/(auth)/register/page";
import { X } from "lucide-react";
import React from "react";

const AddPatientModal = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-slideUp">
      <div className="absolute top-4 right-4 cursor-pointer bg-white rounded-md group">
        <X
          className="w-6 h-6 text-emerald-600 font-bold group-hover:rotate-180 group-hover:text-red-600 transition-all"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <RegisterPage />
    </div>
  );
};

export default AddPatientModal;
