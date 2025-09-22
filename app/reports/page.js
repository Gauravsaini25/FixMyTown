"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import StatCard from "@/components/StatCard";
import { issues, statusColor } from "@/lib/mockData";

export default function Reports() {
  // --- Analytics Data ---
  const byCategory = useMemo(() => {
    const map = {};
    issues.forEach((i) => (map[i.category] = (map[i.category] || 0) + 1));
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, []);

  const bySeverity = useMemo(() => {
    const map = {};
    issues.forEach((i) => {
      const sev = i.severity.charAt(0).toUpperCase() + i.severity.slice(1).toLowerCase();
      map[sev] = (map[sev] || 0) + 1;
    });
    return Object.entries(map)
      .map(([severity, value]) => ({ severity, value }))
      .sort((a, b) => {
        const order = { Critical: 4, High: 3, Medium: 2, Low: 1 };
        return order[b.severity] - order[a.severity];
      });
  }, [issues]);

  const byDate = useMemo(() => {
    const map = {};
    issues.forEach((i) => (map[i.reportedAt] = (map[i.reportedAt] || 0) + 1));
    return Object.entries(map)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, []);

  const byStatus = useMemo(() => {
    const map = {};
    issues.forEach((i) => (map[i.status] = (map[i.status] || 0) + 1));
    return Object.entries(map).map(([status, value]) => ({ status, value }));
  }, []);

  const resolvedCount = issues.filter((i) => i.status === "resolved").length;

  // Color arrays
  const categoryColors = ["#3b82f6", "#06b6d4", "#f59e0b", "#ef4444"];
  const severityGradients = {
    Critical: ["#dc2626", "#f87171"],
    High: ["#f87171", "#fca5a5"],
    Medium: ["#fbbf24", "#fde68a"],
    Low: ["#10b981", "#6ee7b7"],
  };
  const statusGradients = {
    unresolved: ["#f87171", "#fca5a5"],
    "in-progress": ["#fbbf24", "#fde68a"],
    resolved: ["#22c55e", "#86efac"],
  };

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-semibold text-slate-800">
        Reports & Analytics
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Issues" value={issues.length} />
        <StatCard
          title="Resolved Issues"
          value={resolvedCount}
          colorClass="bg-green-50 text-green-600"
        />
        <StatCard
          title="Resolution Rate"
          value={`${Math.round((resolvedCount / issues.length) * 100)}%`}
          colorClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="Avg Resolution Time"
          value="3.5 days"
          colorClass="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Issues by Category */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-slate-200">
          <h4 className="font-medium mb-4 text-slate-700">Issues by Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={90} label>
                {byCategory.map((entry, idx) => (
                  <Cell key={idx} fill={categoryColors[idx % categoryColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Severity with Gradient */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-slate-200">
          <h4 className="font-medium mb-4 text-slate-700">Issues by Severity</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bySeverity} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {bySeverity.map((entry, idx) => (
                  <Cell key={idx} fill={`url(#${entry.severity}-gradient)`} />
                ))}
              </Bar>
              {/* Gradients */}
              {Object.entries(severityGradients).map(([key, [start, end]]) => (
                <linearGradient key={key} id={`${key}-gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={start} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={end} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart - Issues Reported Over Time */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-slate-200">
          <h4 className="font-medium mb-4 text-slate-700">Issues Reported Over Time</h4>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={byDate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart - Issues by Status */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-slate-200">
          <h4 className="font-medium mb-4 text-slate-700">Issues by Status</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byStatus} barSize={40} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {byStatus.map((entry, idx) => (
                  <Cell key={idx} fill={`url(#${entry.status}-gradient)`} />
                ))}
              </Bar>
              {/* Gradients */}
              {Object.entries(statusGradients).map(([key, [start, end]]) => (
                <linearGradient key={key} id={`${key}-gradient`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={start} stopOpacity={0.9} />
                  <stop offset="95%" stopColor={end} stopOpacity={0.7} />
                </linearGradient>
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Section */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-slate-200 lg:col-span-2">
          <h4 className="font-medium mb-4 text-slate-700">Export Reports</h4>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium">
              📊 Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition font-medium">
              📄 Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
