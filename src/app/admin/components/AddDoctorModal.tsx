import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { isErrorResponse } from "@/utils/error-response";
import { AtomIcon, Camera, User2, X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddDoctorModal = ({ setIsOpen }: Props) => {
  const [formData, setFormData] = useState<{
    user_id: string;
    photos: File | null;
    specialization: string;
  }>({
    user_id: "",
    photos: null,
    specialization: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photos: file, // simpan File, bukan string
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};
    if (!formData.user_id) newErrors.user_id = "User ID is required";
    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("user_id", formData.user_id);
      data.append("specialization", formData.specialization);
      if (formData.photos) {
        data.append("photos", formData.photos);
      }
      const res = await axiosInstance.post("/v1/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccess(res.data.message);
    } catch (error) {
      setIsLoading(false);
      isErrorResponse(error, "Add Doctor failed");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-md">
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
          <h1 className="text-2xl font-bold text-gray-900">Add Doctor</h1>
          <p className="text-gray-600 mt-1">
            Please fill out the form below to add a new doctor.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
            <Input
              label="User ID"
              type="text"
              name="user_id"
              value={formData.user_id}
              onChange={handleInputChange}
              error={errors.user_id}
              placeholder="user id"
            >
              <User2 className="text-gray-400" />
            </Input>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <Input
              label="Photos"
              type="file"
              name="photos"
              onChange={handleFileChange}
              placeholder="photos"
            >
              <Camera className="text-gray-400" />
            </Input>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
            <Input
              label="Specialist"
              type="text"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              error={errors.specialization}
              placeholder="Specialist"
            >
              <AtomIcon className="text-gray-400" />
            </Input>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
            <Button type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorModal;
