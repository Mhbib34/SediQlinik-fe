"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonner";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, MapPin, Phone, User2 } from "lucide-react";

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    gender: "",
    date_of_birth: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    try {
      const newErrors: { [key: string]: string } = {};
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.password.trim())
        newErrors.password = "Password is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.gender.trim()) newErrors.gender = "Gender is required";
      if (!formData.date_of_birth.trim())
        newErrors.date_of_birth = "Date of birth is required";

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const res = await axiosInstance.post("/v1/auth/register", formData);
      showSuccess(res.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
      isErrorResponse(error, "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-emerald-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8 animate-slideInUp">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-scaleIn">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 animate-fadeIn">
            Create Account
          </h1>
          <p
            className="text-gray-600 mt-1 animate-fadeIn"
            style={{ animationDelay: "0.1s" }}
          >
            Join our clinic management system
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="animate-fadeIn" style={{ animationDelay: "0.2s" }}>
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              placeholder="John Smith"
              className="w-full"
            >
              <User2 className="w-5 h-5 text-gray-400" />
            </Input>
          </div>

          <div
            className="animate-fadeIn flex space-x-4 justify-between items-center"
            style={{ animationDelay: "0.3s" }}
          >
            <Input
              className="w-1/2"
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              placeholder="example@gmail.com"
            >
              <Mail className="w-5 h-5 text-gray-400" />
            </Input>
            <Input
              className="w-1/2"
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              error={errors.phone}
              placeholder="+62 123 456 7890"
            >
              <Phone className="w-5 h-5 text-gray-400" />
            </Input>
          </div>
          <div
            className="animate-fadeIn flex space-x-4 items-center justify-between"
            style={{ animationDelay: "0.4s" }}
          >
            <Input
              className="w-1/2"
              label="Address"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={errors.address}
              placeholder="jalan merdeka no 21"
            >
              <MapPin className="w-5 h-5 text-gray-400" />
            </Input>
            <div className="w-1/2 ">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <div
            className="animate-fadeIn flex items-center space-x-4 justify-between"
            style={{ animationDelay: "0.5s" }}
          >
            <Input
              className="w-1/2"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              placeholder="Create a strong password"
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
            <Input
              className="w-1/2"
              label="Birth Date"
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              error={errors.date_of_birth}
              placeholder="01/01/2000"
            />
          </div>
          <div
            className="animate-fadeIn"
            style={{ animationDelay: "0.6s" }}
          ></div>

          <div
            className="flex items-start animate-fadeIn"
            style={{ animationDelay: "0.7s" }}
          >
            <input
              type="checkbox"
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1"
              required
            />
            <span className="ml-2 text-sm text-gray-600">
              I agree to the{" "}
              <Link
                href="/terms"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Privacy Policy
              </Link>
            </span>
          </div>

          <div className="animate-fadeIn" style={{ animationDelay: "0.8s" }}>
            <Button type="submit" isLoading={isLoading} disabled={isLoading}>
              Create Account
            </Button>
          </div>
        </form>

        {/* Footer */}
        <div
          className="mt-8 text-center animate-fadeIn"
          style={{ animationDelay: "0.9s" }}
        >
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
