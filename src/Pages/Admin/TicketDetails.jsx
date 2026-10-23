import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import {
  UserIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const ATicketDetails = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const badgeColors = {
    OPEN: "bg-yellow-500/20 text-yellow-400",
    IN_PROGRESS: "bg-indigo-500/20 text-indigo-400",
    RESOLVED: "bg-green-500/20 text-green-400",
    CLOSED: "bg-red-500/20 text-red-400",
  };

  const priorityColors = {
    High: "bg-red-500/20 text-red-400",
    Medium: "bg-yellow-500/20 text-yellow-400",
    Low: "bg-green-500/20 text-green-400",
  };

  const fetchTicket = async () => {
    try {
      const res = await api.get(`/admin/tickets/${ticketId}`);
      console.log(res);
      setTicket(res.data.ticket);
      setRemarks(res.data.replies || []);
    } catch (err) {
      console.error("Failed to load ticket details", err);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchTicket();
      setLoading(false);
    };
    load();
  }, [ticketId]);

  if (loading || !ticket)
    return <p className="text-white text-xl">Loading ticket...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        Ticket Details — {ticket.ticketCode}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-semibold mb-2">{ticket.title}</h2>

            <p className="text-gray-300 mb-3">
              {ticket.description || "No description provided."}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <span
                className={`px-4 py-1 rounded-lg ${
                  badgeColors[ticket.status] || "bg-gray-500/20 text-gray-300"
                }`}
              >
                {ticket.status.replace("_", " ")}
              </span>

              <span
                className={`px-4 py-1 rounded-lg ${
                  priorityColors[ticket.priority] ||
                  "bg-gray-500/20 text-gray-300"
                }`}
              >
                Priority: {ticket.priority}
              </span>
            </div>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ChatBubbleLeftRightIcon className="h-6" /> Remarks Timeline
            </h2>

            <div className="space-y-4">
              {remarks.length === 0 && (
                <p className="text-gray-400">No remarks yet.</p>
              )}

              {remarks.map((r) => (
                <div key={r.id} className="bg-slate-900/30 p-4 rounded-xl">
                  <p className="text-sm text-gray-300 whitespace-pre-line">
                    {r.message}
                  </p>

                  <div className="mt-2 text-xs flex justify-between text-gray-400">
                    <span>By: {r.user?.name || "System"}</span>

                    <span>{r.createdAt?.substring(0, 10)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserIcon className="h-6" /> User Info
            </h2>
            <p>
              <strong>Name:</strong> {ticket.customer?.name}
            </p>
            <p>
              <strong>Email:</strong> {ticket.customer?.email}
            </p>
            <p>
              <strong>Phone:</strong> {ticket.customer?.phone}
            </p>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Assigned To</h2>
            <p className="text-cyan-400">
              {ticket.staff?.name || "Unassigned"}
            </p>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10 flex items-center gap-2">
            <CalendarIcon className="h-6 text-cyan-400" />
            <p>Created on: {ticket.createdAt?.substring(0, 10)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATicketDetails;
