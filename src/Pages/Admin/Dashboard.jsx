import React from "react";
import CircleStat from "./widgets/CircleStat";
import TicketsAreaChart from "./widgets/TicketsAreaChart";
import StatusDonut from "./widgets/StatusDonut";

const Dashboard = () => {
  const stats = {
    total: 124,
    open: 25,
    progress: 40,
    resolved: 48,
    closed: 11,
    staff: 8,
    users: 230,
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-7 gap-6">
        <CircleStat label="Total" value={124} max={200} color="#0ea5e9" />
        <CircleStat label="Open" value={25} max={100} color="#facc15" />
        <CircleStat label="In Progress" value={40} max={100} color="#6366f1" />
        <CircleStat label="Resolved" value={48} max={100} color="#22c55e" />
        <CircleStat label="Closed" value={11} max={100} color="#ef4444" />
        <CircleStat label="Staff" value={8} max={50} color="#a855f7" />
        <CircleStat
          label="Users"
          value={stats.users}
          max={500}
          color="#06b6d4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <TicketsAreaChart />
        <StatusDonut />
      </div>
    </div>
  );
};

export default Dashboard;
