import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

import {
  EyeIcon,
  UserPlusIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/24/outline";

import AssignStaffModal from "./AssignStaffModal";
import ChangeStatusModal from "./ChangeStatusModal";

const AllTickets = () => {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const [tickets, setTickets] = useState([]);
  const [staffList, setStaffList] = useState([]);

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openAssignModal, setOpenAssignModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const fetchTickets = async () => {
    try {
      const res = await api.get("/admin/tickets");

      const normalized = res.data.map((t) => ({
        code: t.ticketCode,
        title: t.title,
        userName: t.customerName,
        priority: t.priority.toUpperCase(),
        status: t.status,
        assignedStaffName: t.staffName === "Unassigned" ? null : t.staffName,
        createdAt: t.createdAt,
      }));

      setTickets(normalized);
    } catch (err) {
      console.error("Failed to load tickets", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await api.get("/admin/staff");
      setStaffList(res.data);
    } catch (err) {
      console.error("Failed to load staff");
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchStaff();
  }, []);

  const badgeColors = {
    OPEN: "bg-yellow-500/20 text-yellow-400",
    IN_PROGRESS: "bg-indigo-500/20 text-indigo-400",
    RESOLVED: "bg-green-500/20 text-green-400",
    CLOSED: "bg-red-500/20 text-red-400",
  };

  const priorityColors = {
    HIGH: "bg-red-500/20 text-red-400",
    MEDIUM: "bg-yellow-500/20 text-yellow-400",
    LOW: "bg-green-500/20 text-green-400",
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchFilter = filter === "All" || ticket.status === filter;

    const code = ticket.code?.toLowerCase() || "";
    const title = ticket.title?.toLowerCase() || "";
    const user = ticket.userName?.toLowerCase() || "";

    const matchSearch =
      code.includes(search.toLowerCase()) ||
      title.includes(search.toLowerCase()) ||
      user.includes(search.toLowerCase());

    return matchFilter && matchSearch;
  });

  const openAssign = (ticket) => {
    setSelectedTicket(ticket);
    setOpenAssignModal(true);
  };

  const openStatusChange = (ticket) => {
    setSelectedTicket(ticket);
    setOpenStatusModal(true);
  };

  const handleAssign = async (staffId) => {
    try {
      console.log(staffId);

      const res = await api.put(
        `/admin/tickets/${selectedTicket.code}/assign`,
        { staffId }
      );

      fetchTickets();
    } catch (err) {
      console.error("Failed to assign staff", err);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const res = await api.put(
        `/admin/tickets/${selectedTicket.code}/status`,
        { status: newStatus }
      );

      fetchTickets();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) return <p className="text-white">Loading tickets...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">All Tickets</h1>

      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex gap-3">
          {["All", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((f) => (
            <button
              key={f}
              className={`px-4 py-2 rounded-xl ${
                filter === f
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800/50 hover:bg-slate-700/40"
              }`}
              onClick={() => setFilter(f)}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search tickets..."
          className="bg-slate-900/40 border border-slate-700 p-3 rounded-xl w-full sm:w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-slate-800/40 border border-white/10 p-6 rounded-2xl shadow-xl overflow-x-auto">
        <table className="w-full min-w-[950px]">
          <thead>
            <tr className="text-left text-gray-300 border-b border-slate-700/70">
              <th className="py-3">Code</th>
              <th>Title</th>
              <th>User</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Date</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((t) => (
              <tr
                key={t.code}
                className="border-b border-slate-700/40 hover:bg-slate-700/20 transition"
              >
                <td className="py-4">{t.code}</td>
                <td>{t.title}</td>
                <td>{t.userName}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-lg ${
                      priorityColors[t.priority]
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-lg ${badgeColors[t.status]}`}
                  >
                    {t.status.replace("_", " ")}
                  </span>
                </td>

                <td>{t.assignedStaffName || "Not Assigned"}</td>
                <td>{t.createdAt?.substring(0, 10)}</td>

                <td className="flex justify-end gap-3 py-4 pr-2">
                  <button
                    onClick={() => navigate(`/admin/ticket/${t.code}`)}
                    className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/40"
                  >
                    <EyeIcon className="h-5 w-5 text-cyan-400" />
                  </button>

                  <button
                    onClick={() => openAssign(t)}
                    className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/40"
                  >
                    <UserPlusIcon className="h-5 w-5 text-purple-400" />
                  </button>

                  <button
                    onClick={() => openStatusChange(t)}
                    className="p-2 rounded-lg bg-slate-700/40 hover:bg-slate-600/40"
                  >
                    <ArrowsRightLeftIcon className="h-5 w-5 text-yellow-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AssignStaffModal
        open={openAssignModal}
        onClose={() => setOpenAssignModal(false)}
        staffList={staffList}
        onAssign={handleAssign}
      />

      <ChangeStatusModal
        open={openStatusModal}
        currentStatus={selectedTicket?.status}
        onClose={() => setOpenStatusModal(false)}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AllTickets;
