import React from "react";

const CircleStat = ({ label, value, max, color }) => {
  const safeValue = Number(value) || 0;
  const safeMax = Number(max) || 100;

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(
    (safeValue / safeMax) * circumference,
    circumference
  );

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <svg className="absolute top-0 left-0 w-full h-full">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke="#1f2937"
            strokeWidth="10"
            fill="none"
          />
        </svg>

        <svg className="absolute top-0 left-0 w-full h-full rotate-[-90deg]">
          <circle
            cx="56"
            cy="56"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="flex flex-col items-center">
          <span className="text-xl font-bold">{safeValue}</span>
          <span className="text-xs text-gray-300">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default CircleStat;
