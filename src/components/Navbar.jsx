import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const getRoleButton = () => {
    if (!user) return null;

    switch (user.role) {
      case "ADMIN":
        return (
          <Link
            to="/admin"
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Dashboard
          </Link>
        );
      case "STAFF":
        return (
          <Link
            to="/staff"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Staff Panel
          </Link>
        );
      case "CUSTOMER":
        return (
          <Link
            to="/profile"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Profile
          </Link>
        );
      default:
        return null;
    }
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight"
        >
          SmartSupport
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700 font-medium items-center">
          <Link
            to="/"
            className="hover:text-blue-600 transition-colors duration-300"
          >
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-600 transition-colors duration-300"
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && getRoleButton()}
        </div>

        <button
          className="md:hidden text-gray-800 text-3xl"
          onClick={() => setOpen(!open)}
        >
          {open ? "✖" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden bg-white/90 backdrop-blur-md transition-all duration-300 overflow-hidden shadow-lg ${
          open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-4 flex flex-col space-y-2">
          <Link
            to="/"
            className="py-2 text-gray-700 hover:text-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>

          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className="py-2 text-gray-700 hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="py-2 text-gray-700 hover:text-blue-600 transition"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div onClick={() => setOpen(false)}>{getRoleButton()}</div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
