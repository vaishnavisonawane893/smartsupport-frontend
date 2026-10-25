import React from "react";

const Card = ({ label, value, subtitle, badgeClass }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col justify-between">
    <div className="flex items-center justify-between mb-3">
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {label}
      </p>
      <span
        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${badgeClass}`}
      >
        Today
      </span>
    </div>
    <p className="text-2xl font-semibold text-slate-900">{value}</p>
    <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
  </div>
);

const DashboardCards = ({ stats }) => {
  const data = stats || {
    totalAssigned: 24,
    open: 6,
    inProgress: 11,
    resolved: 7,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <Card
        label="Total Assigned"
        value={data.totalAssigned}
        subtitle="Tickets assigned to you"
        badgeClass="bg-indigo-50 text-indigo-600"
      />
      <Card
        label="Open"
        value={data.open}
        subtitle="Waiting for action"
        badgeClass="bg-amber-50 text-amber-600"
      />
      <Card
        label="In-progress"
        value={data.inProgress}
        subtitle="Currently being worked on"
        badgeClass="bg-blue-50 text-blue-600"
      />
      <Card
        label="Resolved"
        value={data.resolved}
        subtitle="Marked as resolved"
        badgeClass="bg-emerald-50 text-emerald-600"
      />
    </div>
  );
};

export default DashboardCards;
