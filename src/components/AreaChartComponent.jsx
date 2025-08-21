import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { date: "Mon", ActiveUsers: 40, locations: 5 },
  { date: "Tue", ActiveUsers: 38, locations: 7 },
  { date: "Wed", ActiveUsers: 42, locations: 4 },
  { date: "Thu", ActiveUsers: 35, locations: 10 },
  { date: "Fri", ActiveUsers: 45, locations: 2 },
];

export default function AreaChartComponent() {
  return (
    <div className="card shadow-sm mb-4">
    
      <div className="card-body" style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="locations" stackId="1" stroke="#28a745" fill="#28a745" />
            <Area type="monotone" dataKey="ActiveUsers" stackId="1" stroke="#dc3545" fill="#dc3545" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
