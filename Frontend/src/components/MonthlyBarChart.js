// src/components/MonthlyBarChart.js
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div className="chart-tooltip">
        <div className="chart-tooltip-label">Month: {label}</div>
        <div className="chart-tooltip-value">₹ {value.toFixed(2)}</div>
      </div>
    );
  }
  return null;
}

function MonthlyBarChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2>Monthly Spending</h2>
        <p className="muted">Upload a CSV to see month-wise spending.</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: `${item.year}-${String(item.month).padStart(2, "0")}`,
    totalAmount: item.totalAmount,
  }));

  return (
    <div className="card">
      <div className="card-header-row">
        <h2>Monthly Spending</h2>
        <span className="chip chip-soft">Bar chart</span>
      </div>
      <p className="muted">
        Track how your expenses move across months. Hover to see exact values.
      </p>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} barSize={32}>
            <defs>
              <linearGradient
                id="monthlyGradient"
                x1="0"
                y1="1"
                x2="0"
                y2="0"
              >
                <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.8} />
                <stop offset="50%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity={1} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(55,65,81,0.6)"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              tickMargin={8}
              axisLine={{ stroke: "rgba(75,85,99,0.8)" }}
            />
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 11 }}
              axisLine={{ stroke: "rgba(75,85,99,0.8)" }}
              tickFormatter={(val) => `₹${val}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="totalAmount"
              fill="url(#monthlyGradient)"
              radius={[10, 10, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyBarChart;
