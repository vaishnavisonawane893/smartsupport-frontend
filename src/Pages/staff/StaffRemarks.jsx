import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const StaffRemarks = () => {
  const navigate = useNavigate();
  const [remarks, setRemarks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRemarks = async () => {
    try {
      const res = await api.get("/staff/remarks");
      setRemarks(res.data.remarks || []);
    } catch (err) {
      console.error("Failed to load remarks", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRemarks();
  }, []);

  if (loading) return <p className="text-white">Loading remarks...</p>;

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold text-cyan-400 mb-6">All Remarks</h1>

      <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/10 space-y-4">
        {remarks.length === 0 && (
          <p className="text-gray-400 text-center">No remarks found.</p>
        )}

        {remarks.map((r) => (
          <div key={r.id} className="bg-slate-900/40 p-4 rounded-xl">
            <p className="text-sm text-cyan-300 font-semibold">
              Ticket: {r.ticketCode}
            </p>
            <p className="mt-1 whitespace-pre-line">{r.message}</p>

            <div className="mt-2 text-xs flex justify-between text-gray-400">
              <span>By: {r.user?.name || "System"}</span>
              <span>{r.createdAt?.substring(0, 10)}</span>
            </div>

            <button
              onClick={() => navigate(`/staff/tickets/${r.ticketCode}`)}
              className="mt-3 bg-cyan-500 px-3 py-1 rounded-lg"
            >
              View Ticket
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffRemarks;
