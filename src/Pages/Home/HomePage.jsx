import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  TicketIcon,
  ClockIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-1">
      <section className="py-32 md:py-40 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-6">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          SmartSupport
        </h1>

        <p className="text-lg opacity-90 max-w-xl mx-auto mb-10">
          Your Smart, Fast & Modern Complaint Management System
        </p>

        <div className="flex justify-center gap-4">
          {!isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:scale-105 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 hover:scale-105 transition"
              >
                Register
              </button>
            </>
          )}

          {isAuthenticated && (
            <>
              <button
                onClick={() => navigate("/create-ticket")}
                className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:scale-105 transition"
              >
                Generate Ticket
              </button>

              <button
                onClick={() => navigate("/ticket-status")}
                className="px-8 py-3 bg-blue-900 text-white font-semibold rounded-lg hover:bg-blue-800 hover:scale-105 transition"
              >
                Check Status
              </button>
            </>
          )}
        </div>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-14">
          Why Choose SmartSupport?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            Icon={TicketIcon}
            title="Raise Tickets Instantly"
            desc="Users can create complaints within seconds with a clean and simple UI."
          />
          <FeatureCard
            Icon={ClockIcon}
            title="Live Status Tracking"
            desc="Track every update in real-time from staff and admins."
          />
          <FeatureCard
            Icon={BoltIcon}
            title="Lightning Fast Resolution"
            desc="Smart workflow ensures quicker and more effective solutions."
          />
        </div>
      </section>

      <section className="py-20 px-6 bg-white shadow-inner">
        <h2 className="text-3xl font-bold text-center mb-12">
          How SmartSupport Works
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Step
            number="1"
            Icon={ClipboardDocumentCheckIcon}
            text="Customer creates a support ticket"
          />
          <Step
            number="2"
            Icon={UserGroupIcon}
            text="Admin reviews & assigns to staff"
          />
          <Step
            number="3"
            Icon={WrenchScrewdriverIcon}
            text="Staff resolves the issue"
          />
          <Step
            number="4"
            Icon={BoltIcon}
            text="Customer receives instant updates"
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ Icon, title, desc }) => (
  <div className="p-8 bg-white shadow-lg rounded-xl text-center border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
    <Icon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const Step = ({ number, Icon, text }) => (
  <div className="bg-blue-50 p-8 rounded-xl text-center shadow-md border border-blue-100 hover:shadow-xl transition">
    <div className="mx-auto mb-3 bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold">
      {number}
    </div>
    <Icon className="h-10 w-10 mx-auto text-blue-600 mb-3" />
    <p className="text-gray-700">{text}</p>
  </div>
);

export default HomePage;
