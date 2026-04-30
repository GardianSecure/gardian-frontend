// Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";

export default function Dashboard() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios.get("/api/submissions")
      .then(res => setSubmissions(res.data))
      .catch(err => console.error("Failed to load submissions:", err));
  }, []);

  const chartData = {
    labels: ["High", "Medium", "Low", "Informational"],
    datasets: [
      {
        data: [
          submissions.reduce((acc, s) => acc + s.summary?.high || 0, 0),
          submissions.reduce((acc, s) => acc + s.summary?.medium || 0, 0),
          submissions.reduce((acc, s) => acc + s.summary?.low || 0, 0),
          submissions.reduce((acc, s) => acc + s.summary?.informational || 0, 0),
        ],
        backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6", "#9ca3af"],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">GardianX Dashboard</h1>

      {/* Risk Breakdown Chart */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Risk Breakdown</h2>
        <Pie data={chartData} />
      </div>

      {/* Submissions Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Scan History</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Site</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Tier</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Timestamp</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="hover:bg-gray-100">
                <td className="p-2 border">{s.siteUrl}</td>
                <td className="p-2 border">{s.email}</td>
                <td className="p-2 border">{s.tier}</td>
                <td className="p-2 border">{s.status}</td>
                <td className="p-2 border">{new Date(s.timestamp).toLocaleString()}</td>
                <td className="p-2 border">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                    Rescan
                  </button>
                  <button className="bg-green-500 text-white px-3 py-1 rounded">
                    Upgrade to Pro
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
