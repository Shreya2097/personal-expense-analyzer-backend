// src/components/CategoryPieChart.js
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f7f",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#ffbb28",
];

function CategoryPieChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="card">
        <h2>Spending by Category</h2>
        <p className="muted">No data yet. Upload some expenses.</p>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: item.category,
    value: item.totalAmount,
  }));

  return (
    <div className="card">
      <h2>Spending by Category</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryPieChart;
