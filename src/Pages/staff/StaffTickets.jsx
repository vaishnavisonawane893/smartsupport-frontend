import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const StaffTickets = () => {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  const loadTickets = async () => {
    try {
      const res = await api.get("/staff/tickets");
      setTickets(res.data.tickets || []);
    } catch (err) {
      console.error("Failed to load staff tickets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, []);

  const badgeColors = {
    OPEN: "bg-yellow-500/20 text-yellow-400",
    IN_PROGRESS: "bg-indigo-500/20 text-indigo-400",
    RESOLVED: "bg-green-500/20 text-green-400",
    CLOSED: "bg-red-500/20 text-red-400",
  };

  const filteredTickets = tickets.filter((t) => {
    const matchesFilter = filter === "ALL" || t.status === filter;

    const code = t.ticketCode?.toLowerCase() || "";
    const title = t.title?.toLowerCase() || "";

    const matchesSearch =
      code.includes(search.toLowerCase()) ||
      title.includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  if (loading) return <p className="text-white text-xl">Loading tickets...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">
        My Assigned Tickets
      </h1>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <div className="flex gap-3 flex-wrap">
          {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
                filter === f
                  ? "bg-cyan-500 text-white"
                  : "bg-slate-800/50 hover:bg-slate-700/40"
              }`}
            >
              {f.replace("_", " ")}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900/40 border border-slate-700 p-3 rounded-xl w-full sm:w-80"
        />
      </div>

      <div className="bg-slate-800/40 border border-white/10 p-6 rounded-2xl overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="text-gray-300 border-b border-slate-700/70 text-left">
              <th className="py-3">Code</th>
              <th>Title</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right pr-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTickets.map((t) => (
              <tr
                key={t.ticketCode}
                className="border-b border-slate-700/40 hover:bg-slate-700/20 transition"
              >
                <td className="py-4">{t.ticketCode}</td>
                <td>{t.title}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      t.priority === "HIGH"
                        ? "bg-red-500/20 text-red-400"
                        : t.priority === "MEDIUM"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {t.priority}
                  </span>
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-lg text-sm ${
                      badgeColors[t.status]
                    }`}
                  >
                    {t.status.replace("_", " ")}
                  </span>
                </td>

                <td>{t.createdAt?.substring(0, 10)}</td>

                <td className="text-right pr-2">
                  <button
                    onClick={() => navigate(`/staff/tickets/${t.ticketCode}`)}
                    className="px-4 py-2 bg-cyan-500 rounded-xl hover:bg-cyan-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredTickets.length === 0 && (
          <p className="text-gray-400 mt-4 text-center">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default StaffTickets;
