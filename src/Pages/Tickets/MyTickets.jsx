import React, { useState, useEffect } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const MyTickets = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED":
        return "text-green-600 bg-green-100";
      case "IN_PROGRESS":
        return "text-orange-600 bg-orange-100";
      case "OPEN":
        return "text-blue-600 bg-blue-100";
      case "PENDING":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/customer/tickets/my-tickets");
        setTickets(res.data.tickets);
      } catch (error) {
        console.error("Failed to load tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Loading your tickets...
      </div>
    );
  }

  console.log(tickets);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">My Tickets</h1>

        {tickets.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="p-6 bg-white shadow-lg rounded-xl border hover:shadow-2xl transition"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {ticket.title}
                </h3>

                <p className="text-gray-500 text-sm mb-3">
                  Ticket ID:{" "}
                  <span className="font-medium">{ticket.ticketCode}</span>
                </p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Category: </span>
                    {ticket.category}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Priority: </span>
                    {ticket.priority}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Created: </span>
                    {ticket.createdAt?.substring(0, 10)}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                    ticket.status
                  )}`}
                >
                  {ticket.status.replace("_", " ")}
                </span>

                <button
                  onClick={() => navigate(`/ticket/${ticket.ticketCode}`)}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                >
                  View Details
                  <ArrowRightCircleIcon className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10 text-gray-500">
            <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-2 text-gray-400" />
            No tickets found.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;
