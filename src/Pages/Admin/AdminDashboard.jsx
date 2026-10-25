import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const dummyStats = {
    totalTickets: 124,
    open: 25,
    inProgress: 40,
    resolved: 48,
    closed: 11,
    totalStaff: 8,
    todayTickets: 6,
  };

  const last7DaysData = [
    { day: "Mon", tickets: 10 },
    { day: "Tue", tickets: 12 },
    { day: "Wed", tickets: 15 },
    { day: "Thu", tickets: 9 },
    { day: "Fri", tickets: 20 },
    { day: "Sat", tickets: 18 },
    { day: "Sun", tickets: 16 },
  ];

  const pieData = [
    { name: "Open", value: dummyStats.open },
    { name: "In Progress", value: dummyStats.inProgress },
    { name: "Resolved", value: dummyStats.resolved },
    { name: "Closed", value: dummyStats.closed },
  ];

  const COLORS = ["#facc15", "#6366f1", "#22c55e", "#ef4444"];

  useEffect(() => {
    setTimeout(() => {
      setStats(dummyStats);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold animate-pulse text-slate-300">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        <GlassCard
          title="Total Tickets"
          value={stats.totalTickets}
          color="blue"
        />
        <GlassCard title="Open Tickets" value={stats.open} color="yellow" />
        <GlassCard
          title="In Progress"
          value={stats.inProgress}
          color="indigo"
        />
        <GlassCard title="Resolved" value={stats.resolved} color="green" />
        <GlassCard title="Closed" value={stats.closed} color="red" />
        <GlassCard
          title="Total Staff"
          value={stats.totalStaff}
          color="purple"
        />
        <GlassCard
          title="Today's Tickets"
          value={stats.todayTickets}
          color="orange"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Tickets in Last 7 Days</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={last7DaysData}>
              <defs>
                <linearGradient id="colorTickets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="20%" stopColor="#38bdf8" stopOpacity={0.8} />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "10px",
                }}
                labelStyle={{ color: "cyan" }}
              />
              <Area
                type="monotone"
                dataKey="tickets"
                stroke="#38bdf8"
                fill="url(#colorTickets)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-semibold mb-4">
            Ticket Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  borderRadius: "10px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const GlassCard = ({ title, value, color }) => {
  const colorMap = {
    blue: "from-blue-500/70 to-blue-600/70 text-blue-100",
    yellow: "from-yellow-400/70 to-amber-500/70 text-yellow-100",
    indigo: "from-indigo-500/70 to-indigo-600/70 text-indigo-100",
    green: "from-green-500/70 to-green-600/70 text-green-100",
    red: "from-red-500/70 to-red-600/70 text-red-100",
    purple: "from-purple-500/70 to-purple-600/70 text-purple-100",
    orange: "from-orange-500/70 to-orange-600/70 text-orange-100",
  };

  return (
    <div
      className={`
        bg-gradient-to-br ${colorMap[color]}
        backdrop-blur-xl border border-white/10
        shadow-xl shadow-black/40
        p-6 rounded-2xl
        transition-all duration-300
        hover:scale-[1.03] hover:shadow-2xl
      `}
    >
      <p className="text-sm font-semibold opacity-90">{title}</p>
      <h2 className="text-4xl font-bold mt-1 drop-shadow-sm">{value}</h2>
    </div>
  );
};
