"use client";

import { useState, useMemo } from "react";
import { issues as initialIssues, statusColor } from "@/lib/mockData";
import { Eye } from "lucide-react";

export default function IssueManagement() {
  const [issues, setIssues] = useState(initialIssues);
  const [activeTab, setActiveTab] = useState("unresolved");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "all",
    severity: "all",
    sort: "date",
  });
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Severity ranking for sorting
  const severityRank = { High: 3, Medium: 2, Low: 1 };

  // Colors for tabs, headers, rows & modal
  const tabColors = {
    unresolved: {
      tab: "bg-red-50 border-red-200 text-red-700",
      header: "bg-red-100 text-red-700",
      rowHover: "hover:bg-red-50/50",
      modalHeader: "bg-red-600 text-white",
      modalBody: "bg-red-50",
      badge: "bg-red-100 text-red-700",
    },
    "in-progress": {
      tab: "bg-orange-50 border-orange-200 text-orange-700",
      header: "bg-orange-100 text-orange-700",
      rowHover: "hover:bg-orange-50/50",
      modalHeader: "bg-orange-600 text-white",
      modalBody: "bg-orange-50",
      badge: "bg-orange-100 text-orange-700",
    },
    resolved: {
      tab: "bg-green-50 border-green-200 text-green-700",
      header: "bg-green-100 text-green-700",
      rowHover: "hover:bg-green-50/50",
      modalHeader: "bg-green-600 text-white",
      modalBody: "bg-green-50",
      badge: "bg-green-100 text-green-700",
    },
  };

  // Filtering + sorting logic
  const filtered = useMemo(() => {
    return issues
      .filter((i) => i.status === activeTab)
      .filter((i) => {
        if (filters.category !== "all" && i.category !== filters.category)
          return false;
        if (filters.severity !== "all" && i.severity !== filters.severity)
          return false;
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          i.title.toLowerCase().includes(q) ||
          i.id.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (filters.sort === "severity") {
          return severityRank[b.severity] - severityRank[a.severity];
        }
        if (filters.sort === "upvotes") return b.upvotes - a.upvotes;
        if (filters.sort === "date")
          return new Date(b.reportedAt) - new Date(a.reportedAt);
        return 0;
      });
  }, [issues, activeTab, filters, query]);

  function changeStatus(id, newStatus) {
    setIssues((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-slate-800">
        Issue Management
      </h2>

      {/* Tabs */}
      <div className="flex gap-2">
        {["unresolved", "in-progress", "resolved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 
              ${activeTab === tab
                ? tabColors[tab].tab + " shadow-md font-semibold"
                : "bg-slate-100 text-slate-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search issues..."
          className="px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 transition w-full md:w-60"
        />
        <div className="flex gap-3">
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="all">All Categories</option>
            <option value="Roads">Roads</option>
            <option value="Electricity">Electricity</option>
            <option value="Sanitation">Sanitation</option>
            <option value="Water Supply">Water Supply</option>
          </select>

          <select
            value={filters.severity}
            onChange={(e) =>
              setFilters({ ...filters, severity: e.target.value })
            }
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="all">All Severities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
          >
            <option value="date">Newest</option>
            <option value="severity">Severity</option>
            <option value="upvotes">Most Upvotes</option>
          </select>
        </div>
      </div>

      {/* Issue List */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
        <table className="w-full text-sm">
          <thead className={`${tabColors[activeTab].header} text-xs uppercase`}>
            <tr>
              <th className="py-3 px-4 text-left">ID</th>
              <th className="text-left">Title</th>
              <th className="text-left">Category</th>
              <th className="text-left">Status</th>
              <th className="text-left">Severity</th>
              <th className="text-left">Upvotes</th>
              <th className="text-left">Reported</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((issue) => (
              <tr
                key={issue.id}
                className={`border-t transition ${tabColors[activeTab].rowHover}`}
              >
                <td className="py-3 px-4">{issue.id}</td>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>
                  <span
                    className="px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: `${statusColor[issue.status]}22`,
                      color: statusColor[issue.status],
                    }}
                  >
                    {issue.status}
                  </span>
                </td>
                <td>{issue.severity}</td>
                <td>{issue.upvotes}</td>
                <td className="text-xs text-slate-500">{issue.reportedAt}</td>
                <td>
                  <button
                    onClick={() => setSelectedIssue(issue)}
                    className={`
    flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white shadow-md
    transition-all duration-300
    ${issue.status === "unresolved"
                        ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                        : issue.status === "in-progress"
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                          : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                      }
  `}
                  >
                    <Eye size={16} />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="w-full max-w-lg bg-white rounded-xl shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div
              className={`${tabColors[selectedIssue.status].modalHeader} px-6 py-4 flex justify-between items-center`}
            >
              <h3 className="text-lg font-semibold flex items-center gap-2">
                {selectedIssue.title} ({selectedIssue.id})
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${tabColors[selectedIssue.status].badge}`}
                >
                  {selectedIssue.status}
                </span>
              </h3>
            </div>

            {/* Modal Body */}
            <div
              className={`${tabColors[selectedIssue.status].modalBody} px-6 py-4 space-y-3`}
            >
              <p>
                <span className="font-semibold">Category:</span>{" "}
                {selectedIssue.category}
              </p>
              <p>
                <span className="font-semibold">Severity:</span>{" "}
                {selectedIssue.severity}
              </p>
              <p>
                <span className="font-semibold">Upvotes:</span>{" "}
                {selectedIssue.upvotes}
              </p>
              <p>
                <span className="font-semibold">Reported At:</span>{" "}
                {selectedIssue.reportedAt}
              </p>
              <p>
                <span className="font-semibold">Description:</span>{" "}
                {selectedIssue.description}
              </p>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Update Status
                </label>
                <select
                  value={selectedIssue.status}
                  onChange={(e) => {
                    changeStatus(selectedIssue.id, e.target.value);
                    setSelectedIssue({
                      ...selectedIssue,
                      status: e.target.value,
                    });
                  }}
                  className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
                >
                  <option value="unresolved">Unresolved</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedIssue(null)}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
