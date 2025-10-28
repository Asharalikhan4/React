import { FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router";

interface ErrorPageProps {
  statusCode?: number;
  message?: string;
};

const Error404Screen = ({
  statusCode = 404,
  message = "The page you’re looking for doesn’t exist or has been moved.",
}) => {
  
  const is404 = statusCode === 404;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-6 text-center">
      {/* Icon */}
      <div
        className={`mb-4 ${
          is404 ? "text-yellow-400" : "text-red-500"
        } animate-pulse`}
      >
        <FaExclamationTriangle size={64} />
      </div>

      {/* Code */}
      <h1 className="text-7xl font-extrabold mb-2">{statusCode}</h1>

      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-4">
        {is404 ? "Page Not Found" : "Something Went Wrong"}
      </h2>

      {/* Message */}
      <p className="text-gray-400 max-w-md mb-8">{message}</p>

      {/* Button */}
      <NavLink
        to="/"
        className={`px-6 py-3 rounded-full font-semibold text-white shadow-lg transition duration-300 ease-in-out ${
          is404
            ? "bg-yellow-500 hover:bg-yellow-600 hover:shadow-yellow-500/30"
            : "bg-red-500 hover:bg-red-600 hover:shadow-red-500/30"
        }`}
      >
        Go Home
      </NavLink>
    </div>
  );
};

export default Error404Screen;
