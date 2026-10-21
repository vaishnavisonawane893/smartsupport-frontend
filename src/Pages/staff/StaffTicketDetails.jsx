import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import ChangeStatusModal from "../Admin/ChangeStatusModal";

import {
  ChatBubbleBottomCenterTextIcon,
  WrenchScrewdriverIcon,
  UserIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const StaffTicketDetails = () => {
  const { code } = useParams();

  const [ticket, setTicket] = useState(null);
  const [replies, setReplies] = useState([]);
  const [message, setMessage] = useState("");

  const [statusModal, setStatusModal] = useState(false);

  useEffect(() => {
    console.log("📌 useEffect triggered for ticket:", code);
    loadTicket();
    loadReplies();
  }, [code]);

  const loadTicket = async () => {
    try {
      console.log("📡 Fetching Ticket:", `/staff/tickets/${code}`);
      const res = await api.get(`/staff/tickets/${code}`);

      console.log("✅ Ticket Loaded:", res.data);
      setTicket(res.data);
    } catch (err) {
      console.error("❌ Failed to load ticket:", err);
    }
  };

  const loadReplies = async () => {
    try {
      console.log("📡 Fetching Replies:", `/staff/tickets/${code}/replies`);
      const res = await api.get(`/staff/tickets/${code}/replies`);

      console.log("✅ Replies Loaded:", res.data);
      setReplies(res.data.replies || res.data);
    } catch (err) {
      console.error("❌ Failed to load replies:", err);
    }
  };

  const sendReply = async () => {
    if (!message.trim()) return;

    try {
      console.log("📨 Sending Reply:", message);

      const res = await api.post(`/staff/tickets/${code}/reply`, { message });

      console.log("✅ Reply Sent Successfully:", res.data);

      setMessage("");
      loadReplies();
    } catch (err) {
      console.error("❌ Failed to send reply:", err);
    }
  };

  const getTypeIcon = (reply) => {
    const type = reply.type || reply.replyType;

    switch (type) {
      case "CUSTOMER":
        return (
          <ChatBubbleBottomCenterTextIcon className="w-5 h-5 text-green-400" />
        );
      case "STAFF":
        return <WrenchScrewdriverIcon className="w-5 h-5 text-yellow-400" />;
      case "STATUS_UPDATE":
        return <CheckCircleIcon className="w-5 h-5 text-blue-400" />;
      default:
        return <UserIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  if (!ticket) return <p className="text-white">Loading...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">
        Ticket: {ticket.ticketCode}
      </h1>

      <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10 mb-8">
        <p>
          <strong>Title:</strong> {ticket.title}
        </p>
        <p>
          <strong>Category:</strong> {ticket.category}
        </p>
        <p>
          <strong>Priority:</strong> {ticket.priority}
        </p>
        <p>
          <strong>Status:</strong> {ticket.status.replace("_", " ")}
        </p>

        <button
          onClick={() => setStatusModal(true)}
          className="mt-4 bg-yellow-500 px-4 py-2 rounded-xl"
        >
          Change Status
        </button>
      </div>

      <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10 mb-10">
        <h2 className="text-xl font-bold mb-3">Add Reply</h2>

        <textarea
          className="w-full bg-slate-900/40 border border-slate-700 p-3 rounded-xl"
          rows="3"
          placeholder="Type your reply..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={sendReply}
          className="mt-3 bg-cyan-500 px-4 py-2 rounded-xl"
        >
          Send Reply
        </button>
      </div>

      <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10">
        <h2 className="text-xl font-bold mb-6">Ticket Timeline</h2>

        <div className="relative ml-6">
          <div className="absolute top-4 bottom-0 left-4 w-1 bg-slate-700 rounded-full"></div>

          {replies.map((r) => (
            <div key={r.id} className="relative flex items-start mb-8">
              <div className="absolute -left-1 w-8 h-8 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow">
                {getTypeIcon(r)}
              </div>

              <div className="ml-12">
                <p className="font-semibold text-cyan-300">
                  {r.user?.name || "System"} ({r.user?.role || "SYSTEM"})
                </p>

                <p className="text-gray-300 whitespace-pre-line">{r.message}</p>

                <p className="text-gray-500 text-sm mt-1">
                  {r.createdAt?.replace("T", " | ").substring(0, 19)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ChangeStatusModal
        open={statusModal}
        onClose={() => setStatusModal(false)}
        currentStatus={ticket.status}
        onUpdate={async (newStatus) => {
          console.log("🔄 Updating Status To:", newStatus);

          const res = await api.put(`/staff/tickets/${code}/status`, {
            status: newStatus,
          });

          console.log("✅ Status Updated Successfully:", res.data);

          loadTicket();
        }}
      />
    </div>
  );
};

export default StaffTicketDetails;
