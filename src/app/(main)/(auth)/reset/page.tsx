"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Lock, User2 } from "lucide-react";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { useRouter } from "next/navigation";

const ResetPWPage: React.FC = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    newPassword: "",
    otp: 0,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};
    if (!formData.identifier)
      newErrors.identifier = "Email or phone is required";
    if (!formData.newPassword) newErrors.newPassword = "Password is required";
    if (!formData.otp) newErrors.otp = "OTP is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.patch("/v1/auth/reset", formData);
      showSuccess(res.data.message);
      router.push("/login");
    } catch (error) {
      setIsLoading(false);
      console.log(error);

      isErrorResponse(error, "Reset Password failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-1">Sign in to your clinic account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="animate-fadeIn" style={{ animationDelay: "0.3s" }}>
          <Input
            label="Email / Phone Number"
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleInputChange}
            error={errors.identifier}
            placeholder="user@clinic.com/+628123456789"
          >
            <User2 className="text-gray-400" />
          </Input>
        </div>

        <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleInputChange}
            error={errors.newPassword}
            placeholder="Enter your new password"
          >
            {showPassword ? (
              <EyeOff
                className="text-gray-400"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="text-gray-400"
                onClick={() => setShowPassword(true)}
              />
            )}
          </Input>
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "0.5s" }}>
          <Input
            label="OTP"
            type="number"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            error={errors.otp}
            placeholder="Enter your OTP"
          >
            <Lock className="text-gray-400" />
          </Input>
        </div>
        <div className="animate-fadeIn" style={{ animationDelay: "0.6s" }}>
          <Button type="submit" isLoading={isLoading}>
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPWPage;
