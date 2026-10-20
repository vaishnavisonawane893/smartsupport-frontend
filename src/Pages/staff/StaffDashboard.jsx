import React, { useEffect, useState } from "react";
import CircleStat from "../Admin/widgets/CircleStat";
import TicketsAreaChart from "../Admin/widgets/TicketsAreaChart";
import StatusDonut from "../Admin/widgets/StatusDonut";
import api from "../../api/axios";

const StaffDashboard = () => {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await api.get("/staff/tickets/stats");

      console.log(res);
      setStats({
        assigned: res.data.assigned ?? 0,
        open: res.data.open ?? 0,
        inProgress: res.data.inProgress ?? 0,
        resolved: res.data.resolved ?? 0,
        closed: res.data.closed ?? 0,
      });
    } catch (err) {
      console.log("Error fetching stats", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p className="text-white">Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Staff Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        <CircleStat
          label="Assigned"
          value={stats.assigned}
          max={100}
          color="#0ea5e9"
        />
        <CircleStat label="Open" value={stats.open} max={100} color="#facc15" />
        <CircleStat
          label="In Progress"
          value={stats.inProgress}
          max={100}
          color="#6366f1"
        />
        <CircleStat
          label="Resolved"
          value={stats.resolved}
          max={100}
          color="#22c55e"
        />
        <CircleStat
          label="Closed"
          value={stats.closed}
          max={100}
          color="#ef4444"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <TicketsAreaChart />
        <StatusDonut />
      </div>
    </div>
  );
};

export default StaffDashboard;
