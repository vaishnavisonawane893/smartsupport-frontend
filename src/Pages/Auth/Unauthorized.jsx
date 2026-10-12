import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>

        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          Unauthorized Access
        </h2>

        <p className="text-gray-500 mb-6">
          You don't have permission to access this page.
        </p>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/login")}
            className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate("/")}
            className="py-3 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
