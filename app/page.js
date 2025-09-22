"use client";

import MiniMap from "@/components/MiniMap";
import { issues } from "@/lib/mockData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardPage() {
  // --- Analytics Data ---
  const resolutionTrend = Object.entries(
    issues.reduce((acc, i) => {
      acc[i.reportedAt] = acc[i.reportedAt] || { reported: 0, resolved: 0 };
      acc[i.reportedAt].reported += 1;
      if (i.status === "resolved") acc[i.reportedAt].resolved += 1;
      return acc;
    }, {})
  ).map(([date, obj]) => ({
    date,
    reported: obj.reported,
    resolved: obj.resolved,
    resolutionRate: Math.round((obj.resolved / obj.reported) * 100),
  }));

  const topIssues = [...issues]
    .sort((a, b) => (b.upvotes || 0) - (a.upvotes || 0))
    .slice(0, 5);

  return (
    <div className="flex-1 flex flex-col space-y-6">
      {/* Full-width Map */}
      <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-lg border border-blue-100">
        <MiniMap issues={issues} />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200 text-center">
          <h3 className="text-sm text-slate-500">Total Issues</h3>
          <p className="text-xl font-semibold">{issues.length}</p>
        </div>
        <div className="bg-green-50 rounded-xl shadow-lg p-4 border border-slate-200 text-center">
          <h3 className="text-sm text-green-600">Resolved</h3>
          <p className="text-xl font-semibold">
            {issues.filter(i => i.status === "resolved").length}
          </p>
        </div>
        <div className="bg-red-50 rounded-xl shadow-lg p-4 border border-slate-200 text-center">
          <h3 className="text-sm text-red-600">Unresolved</h3>
          <p className="text-xl font-semibold">
            {issues.filter(i => i.status === "unresolved").length}
          </p>
        </div>
        <div className="bg-orange-50 rounded-xl shadow-lg p-4 border border-slate-200 text-center">
          <h3 className="text-sm text-orange-600">In Progress</h3>
          <p className="text-xl font-semibold">
            {issues.filter(i => i.status === "in-progress").length}
          </p>
        </div>
      </div>

      {/* Line Chart - Resolution Trend */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          📈 Resolution Trend
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={resolutionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="reported"
              stroke="#3b82f6"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="resolved"
              stroke="#10b981"
              strokeWidth={3}
            />
            <Line
              type="monotone"
              dataKey="resolutionRate"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Upvoted Issues */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border border-blue-100 hover:shadow-xl transition">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          🌟 Top Upvoted Issues
        </h2>
        <ul className="space-y-2 max-h-[300px] overflow-y-auto">
          {topIssues.map(issue => (
            <li
              key={issue.id}
              className="flex justify-between items-center bg-blue-50 rounded-lg p-3 shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium">{issue.title}</span>
              <span className="text-sm text-slate-500">{issue.upvotes || 0} ⭐</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
