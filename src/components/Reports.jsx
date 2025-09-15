import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// ---------------- Mock Data ----------------
const touristData = [
  { date: "2025-09-08", tourists: 120, incidents: 2 },
  { date: "2025-09-09", tourists: 132, incidents: 1 },
  { date: "2025-09-10", tourists: 145, incidents: 3 },
  { date: "2025-09-11", tourists: 150, incidents: 2 },
  { date: "2025-09-12", tourists: 165, incidents: 4 },
  { date: "2025-09-13", tourists: 158, incidents: 2 },
  { date: "2025-09-14", tourists: 156, incidents: 1 },
];

const locationData = [
  { name: "Kaziranga", tourists: 45, coords: [26.577, 93.362] },
  { name: "Majuli", tourists: 30, coords: [26.9, 94.2] },
  { name: "Kamakhya", tourists: 25, coords: [26.1662, 91.7362] },
  { name: "Tawang", tourists: 20, coords: [27.58, 91.87] },
  { name: "Cherrapunji", tourists: 35, coords: [25.3, 91.7] },
];

const riskData = [
  { name: "Low Risk", value: 65, color: "#10B981" },
  { name: "Medium Risk", value: 25, color: "#F59E0B" },
  { name: "High Risk", value: 10, color: "#EF4444" },
];

// ---------------- Download Helpers ----------------
function downloadCSV(filename, rows) {
  const processRow = (row) =>
    Object.values(row)
      .map((val) => `"${val}"`)
      .join(",");

  const csvContent =
    Object.keys(rows[0]).join(",") +
    "\n" +
    rows.map((r) => processRow(r)).join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ---------------- Reports Component ----------------
export default function Reports() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Analytics & Reports
        </h2>
        {/* <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select> */}
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tourist Activity Chart */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tourist Activity
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Number of tourists and incidents over time
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={touristData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) =>
                    new Date(date).toLocaleDateString("en-IN")
                  }
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="tourists"
                  stroke="#6366F1"
                  fill="#6366F1"
                  fillOpacity={0.2}
                  name="Tourists"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="incidents"
                  stroke="#EF4444"
                  fill="#EF4444"
                  fillOpacity={0.2}
                  name="Incidents"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Popular Locations Map */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Popular Locations
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Tourist distribution by location
          </p>
          <div className="h-80">
            <MapContainer
              center={[22.5, 82.8]} // Center of India
              zoom={5}
              style={{ height: "100%", width: "100%", borderRadius: "12px" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />
              {locationData.map((loc, i) => (
                <Marker key={i} position={loc.coords}>
                  <Popup>
                    <strong>{loc.name}</strong>
                    <br />
                    Tourists: {loc.tourists}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* Risk Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Risk Distribution
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Tourist safety risk levels
          </p>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry) => `${entry.name} (${entry.value}%)`}
                >
                  {riskData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export Reports */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Export Reports
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Download detailed reports
          </p>
          <div className="space-y-4">
            <button
              onClick={() => downloadCSV("tourist_activity.csv", touristData)}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Tourist Activity Report
            </button>
            <button
              onClick={() =>
                downloadCSV("safety_incidents.csv", touristData.map(d => ({date: d.date, incidents: d.incidents})))
              }
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Safety Incidents Report
            </button>
            <button
              onClick={() => downloadCSV("location_analytics.csv", locationData)}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Location Analytics Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
