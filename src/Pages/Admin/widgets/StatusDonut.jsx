import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Open", value: 25 },
  { name: "In Progress", value: 40 },
  { name: "Resolved", value: 48 },
  { name: "Closed", value: 11 },
];

const COLORS = ["#facc15", "#6366f1", "#22c55e", "#ef4444"];

const StatusDonut = () => {
  return (
    <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
      <h2 className="text-xl font-semibold mb-4">Ticket Status Distribution</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
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
  );
};

export default StatusDonut;
