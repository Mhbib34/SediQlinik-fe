import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Queue } from "@/types/queue";
import { Text, X } from "lucide-react";
import React from "react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  completeForm: { notes: string };
  handleCompletedPatient: (id: string) => void;
  isLoading: boolean;
  queues: Queue;
};

const FormCompleteQueue = ({
  setIsOpen,
  handleInputChange,
  completeForm,
  handleCompletedPatient,
  isLoading,
  queues,
}: Props) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md animate-slideUp h-screen">
      <div className="absolute top-4 right-4 cursor-pointer bg-white rounded-md group">
        <X
          className="w-6 h-6 text-emerald-600 font-bold group-hover:rotate-180 group-hover:text-red-600 transition-all"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div
          className="text-center mb-8 animate-fadeIn"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Add Diagnosis</h1>
        </div>

        {/* Form */}
        <div className="space-y-6">
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <Input
              label="Notes"
              type="text"
              name="notes"
              value={completeForm.notes}
              onChange={handleInputChange}
              placeholder="Notes"
            >
              <Text className="text-gray-400" />
            </Input>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <Button
              onClick={() => handleCompletedPatient(queues.id)}
              isLoading={isLoading}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCompleteQueue;
