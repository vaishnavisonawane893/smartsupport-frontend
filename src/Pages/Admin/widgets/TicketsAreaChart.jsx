import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", tickets: 10 },
  { day: "Tue", tickets: 12 },
  { day: "Wed", tickets: 15 },
  { day: "Thu", tickets: 9 },
  { day: "Fri", tickets: 20 },
  { day: "Sat", tickets: 18 },
  { day: "Sun", tickets: 16 },
];

const TicketsAreaChart = () => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Tickets in Last 7 Days</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
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
            labelStyle={{ color: "#38bdf8" }}
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
  );
};

export default TicketsAreaChart;
