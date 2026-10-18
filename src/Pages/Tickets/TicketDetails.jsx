import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import {
  ChatBubbleBottomCenterTextIcon,
  WrenchScrewdriverIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const TicketDetails = () => {
  const { ticketCode } = useParams();

  const [ticket, setTicket] = useState(null);
  const [updates, setUpdates] = useState([]);
  const [newReply, setNewReply] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tRes = await api.get(`/customer/tickets/${ticketCode}`);
        if (tRes.data.success) setTicket(tRes.data.ticket);

        const rRes = await api.get(`/customer/tickets/${ticketCode}/replies`);
        if (rRes.data.success) setUpdates(rRes.data.replies);
      } catch (err) {
        console.error("Failed to load details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ticketCode]);

  const sendReply = async () => {
    if (!newReply.trim()) return;

    try {
      const res = await api.post(`/customer/tickets/${ticketCode}/reply`, {
        message: newReply,
      });

      if (res.data.success) {
        setUpdates((prev) => [...prev, res.data.reply]);
        setNewReply("");
      }
    } catch (err) {
      console.error("Failed to send reply:", err);
    }
  };

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

  const getTypeIcon = (replyType) => {
    switch (replyType) {
      case "SYSTEM":
        return <UserIcon className="w-6 h-6 text-blue-600" />;
      case "CUSTOMER":
        return (
          <ChatBubbleBottomCenterTextIcon className="w-6 h-6 text-green-600" />
        );
      case "STAFF":
        return <WrenchScrewdriverIcon className="w-6 h-6 text-orange-600" />;
      case "STATUS_UPDATE":
        return <CheckCircleIcon className="w-6 h-6 text-green-600" />;
      default:
        return <UserIcon className="w-6 h-6 text-gray-400" />;
    }
  };

  if (loading)
    return (
      <div className="text-center mt-20 text-gray-500">Loading ticket...</div>
    );

  if (!ticket)
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Ticket not found.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-8 shadow-md rounded-xl border mb-10">
          <h1 className="text-3xl font-bold text-blue-700 mb-2">
            {ticket.title}
          </h1>

          <p className="text-gray-600 text-sm">
            Ticket ID:{" "}
            <span className="font-semibold">{ticket.ticketCode}</span>
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
              {ticket.category}
            </span>

            <span className="px-4 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
              Priority: {ticket.priority}
            </span>

            <span
              className={`px-4 py-1 rounded-full font-medium ${getStatusColor(
                ticket.status
              )}`}
            >
              {ticket.status.replace("_", " ")}
            </span>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>
              Created: <strong>{ticket.createdAt?.substring(0, 10)}</strong>
            </p>
            <p>
              Last Updated:{" "}
              <strong>{ticket.updatedAt?.substring(0, 10)}</strong>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl border mb-10">
          <h2 className="text-xl font-semibold mb-2">Issue Description</h2>
          <p className="text-gray-700 leading-relaxed">{ticket.description}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow mb-10 border">
          <h2 className="text-xl font-semibold mb-3">Add Reply</h2>

          <textarea
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
            placeholder="Write your reply..."
            className="w-full p-3 border rounded-lg"
            rows={3}
          ></textarea>

          <button
            onClick={sendReply}
            className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send Reply
          </button>
        </div>

        <div className="bg-white p-6 shadow-md rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Ticket Timeline</h2>

          <div className="relative ml-6">
            <div className="absolute top-4 bottom-0 left-4 w-1 bg-gray-300 rounded-full"></div>

            {updates.map((item) => (
              <div key={item.id} className="relative flex items-start mb-8">
                <div
                  className="
            absolute -left-1
            w-8 h-8
            flex items-center justify-center
            bg-white border rounded-full shadow-sm
        "
                >
                  {getTypeIcon(item.replyType)}
                </div>

                <div className="ml-10">
                  <p className="text-gray-900 font-semibold">
                    {item.user?.name || "System"} ({item.user?.role || "SYSTEM"}
                    )
                  </p>
                  <p className="text-gray-700">{item.message}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    {item.createdAt.replace("T", " | ").substring(0, 19)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-10"></div>
      </div>
    </div>
  );
};

export default TicketDetails;
