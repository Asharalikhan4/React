import React from "react";
import useIdle from "../../customHooks/useIdle";

const UseIdleHook: React.FC = () => {
  const isIdle = useIdle(100);

  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center transition-colors duration-300 ${
        isIdle ? "bg-red-500" : "bg-green-500"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="text-white text-2xl sm:text-3xl font-semibold text-center px-4">
        {isIdle ? "User Inactive" : "User Active"}
      </div>
    </div>
  );
};

export default UseIdleHook;
