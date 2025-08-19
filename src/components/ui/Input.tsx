import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div
        className={`w-full px-3 py-2 flex items-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
          error ? "border-red-500" : ""
        }`}
      >
        <input
          id={label}
          className={`w-full focus:outline-none transition-colors  text-black placeholder:text-gray-400 ${className}`}
          {...props}
        />
        {children}
      </div>
      {error && <p className="text-sm text-red-600 animate-fadeIn">{error}</p>}
    </div>
  );
};
