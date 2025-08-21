import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Patients user", value: 400 },
  { name: "Documents", value: 120 },
  { name: "Doctors", value: 30 },
];

const COLORS = ["#28a745", "#dc3545", "#ffc107"]; // Green, Red, Yellow

export default function PieChartComponent() {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
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
