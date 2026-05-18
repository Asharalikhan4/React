import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (e? : any) => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const baseStyles =
  "relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95";

const variants = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:brightness-110 focus:ring-indigo-400",
  secondary:
    "bg-gradient-to-r from-slate-600 to-slate-800 text-white shadow-md hover:shadow-lg focus:ring-slate-400",
  danger:
    "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md hover:shadow-lg focus:ring-red-400",
  outline:
    "border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 focus:ring-gray-300",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function CustomButton({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || loading ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </span>
      )}

      <span className={loading ? "opacity-0" : "opacity-100"}>{children}</span>
    </button>
  );
}
