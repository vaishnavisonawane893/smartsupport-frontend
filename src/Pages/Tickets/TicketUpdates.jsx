import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChatBubbleBottomCenterTextIcon,
  WrenchScrewdriverIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const TicketUpdates = () => {
  const navigate = useNavigate();

  const DUMMY_UPDATES = [
    {
      id: 1,
      ticketId: "TCK-001",
      ticketTitle: "Internet not working",
      message: "Your ticket has been assigned to Ravi (Network Engineer)",
      type: "Assigned",
      time: "10:45 AM",
      date: "2025-01-14",
    },
    {
      id: 2,
      ticketId: "TCK-001",
      ticketTitle: "Internet not working",
      message: "The issue is currently being diagnosed",
      type: "In Progress",
      time: "12:10 PM",
      date: "2025-01-14",
    },
    {
      id: 3,
      ticketId: "TCK-002",
      ticketTitle: "Laptop overheating",
      message: "A new comment was added by staff",
      type: "Comment",
      time: "02:05 PM",
      date: "2025-01-15",
    },
    {
      id: 4,
      ticketId: "TCK-003",
      ticketTitle: "Billing mismatch",
      message: "Your issue has been resolved",
      type: "Resolved",
      time: "05:30 PM",
      date: "2025-01-10",
    },
  ];

  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    setUpdates(DUMMY_UPDATES);
  }, []);

  const getTypeIcon = (type) => {
    switch (type) {
      case "Assigned":
        return <UserIcon className="w-8 h-8 text-blue-600" />;
      case "In Progress":
        return <WrenchScrewdriverIcon className="w-8 h-8 text-orange-600" />;
      case "Comment":
        return (
          <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-green-600" />
        );
      case "Resolved":
        return <CheckCircleIcon className="w-8 h-8 text-green-700" />;
      default:
        return <UserIcon className="w-8 h-8 text-gray-500" />;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "Assigned":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-orange-100 text-orange-700";
      case "Comment":
        return "bg-green-100 text-green-700";
      case "Resolved":
        return "bg-green-200 text-green-800 font-bold";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          Ticket Updates
        </h1>

        <div className="space-y-6">
          {updates.map((update) => (
            <div
              key={update.id}
              className="bg-white shadow-md p-6 rounded-xl border hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
              onClick={() => navigate(`/ticket/${update.ticketId}`)}
            >
              <div className="flex items-center gap-4">
                {getTypeIcon(update.type)}

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {update.ticketTitle}
                  </h3>

                  <p className="text-gray-600 text-sm mt-1">{update.message}</p>

                  <div className="flex items-center justify-between mt-3">
                    <span
                      className={`px-3 py-1 text-sm rounded-full ${getColor(
                        update.type
                      )}`}
                    >
                      {update.type}
                    </span>

                    <p className="text-sm text-gray-500">
                      {update.date} • {update.time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {updates.length === 0 && (
            <div className="text-center mt-10 text-gray-500">
              No updates at the moment
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketUpdates;
