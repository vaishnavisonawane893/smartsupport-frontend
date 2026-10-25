import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  TicketIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
  BellAlertIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const cards = [
    {
      title: "Generate Ticket",
      desc: "Create a new support request",
      icon: TicketIcon,
      action: () => navigate("/create-ticket"),
    },
    {
      title: "My Tickets",
      desc: "View all your submitted support tickets",
      icon: ClipboardDocumentListIcon,
      action: () => navigate("/my-tickets"),
    },
    {
      title: "Ticket Updates",
      desc: "See all updates & notifications on your issues",
      icon: BellAlertIcon,
      action: () => navigate("/ticket-updates"),
    },
    {
      title: "Logout",
      desc: "Sign out from your account",
      icon: ArrowRightCircleIcon,
      action: () => navigate("/logout"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-700 mb-2">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <p className="text-gray-600">
          Here's an overview of your SmartSupport dashboard
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <div
            key={i}
            onClick={card.action}
            className="p-6 bg-white shadow-lg rounded-xl border hover:shadow-2xl hover:-translate-y-1 transition cursor-pointer"
          >
            <card.icon className="h-12 w-12 text-blue-600 mb-3" />
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-gray-500 text-sm mt-1">{card.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-12 bg-white p-6 rounded-xl shadow border">
        <h2 className="text-2xl font-semibold mb-4">Your Information</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Info label="Full Name" value={user?.name} />
          <Info label="Email" value={user?.email} />
          <Info label="Phone Number" value={user?.phone} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-gray-500 text-sm">{label}</p>
    <p className="text-gray-800 text-lg font-medium">{value || "-"}</p>
  </div>
);

export default Profile;
