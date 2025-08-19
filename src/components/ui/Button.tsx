import React from "react";
import LoadingSpinner from "../fragment/LoadingSpinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  isLoading = false,
  disabled,
  ...props
}) => {
  const baseClasses =
    "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 disabled:bg-blue-400",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 disabled:bg-gray-50",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className} ${
        disabled || isLoading ? "cursor-not-allowed" : ""
      }`}
      disabled={disabled || isLoading}
      {...props}
    >
      <span
        className={`flex items-center justify-center ${
          isLoading ? "opacity-0" : ""
        }`}
      >
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" />
        </div>
      )}
    </button>
  );
};

export default Button;
