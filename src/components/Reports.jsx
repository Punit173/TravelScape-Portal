import { useState } from 'react';
import ChartCard from './ChartCard';
import BarChart3D from './BarChart3D';
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
  Cell
} from 'recharts';

// Mock data - replace with actual API data
const touristData = [
  { date: '2025-09-08', tourists: 120, incidents: 2 },
  { date: '2025-09-09', tourists: 132, incidents: 1 },
  { date: '2025-09-10', tourists: 145, incidents: 3 },
  { date: '2025-09-11', tourists: 150, incidents: 2 },
  { date: '2025-09-12', tourists: 165, incidents: 4 },
  { date: '2025-09-13', tourists: 158, incidents: 2 },
  { date: '2025-09-14', tourists: 156, incidents: 1 },
];

const locationData = [
  { name: 'Kaziranga', tourists: 45 },
  { name: 'Majuli', tourists: 30 },
  { name: 'Kamakhya', tourists: 25 },
  { name: 'Tawang', tourists: 20 },
  { name: 'Cherrapunji', tourists: 35 },
];

const riskData = [
  { name: 'Low Risk', value: 65, color: '#10B981' },
  { name: 'Medium Risk', value: 25, color: '#F59E0B' },
  { name: 'High Risk', value: 10, color: '#EF4444' },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="day">Last 24 Hours</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Tourist Activity"
          subtitle="Number of tourists and incidents over time"
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={touristData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
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
        </ChartCard>

        <ChartCard
          title="Popular Locations"
          subtitle="Tourist distribution by location"
        >
          <div className="h-80">
            <BarChart3D
              data={locationData.map(item => ({
                name: item.name,
                value: item.tourists
              }))}
              maxHeight={5}
            />
          </div>
        </ChartCard>

        <ChartCard
          title="Risk Distribution"
          subtitle="Tourist safety risk levels"
        >
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
        </ChartCard>

        <ChartCard
          title="Export Reports"
          subtitle="Download detailed reports"
          className="flex flex-col justify-between"
        >
          <div className="space-y-4">
            <button
              onClick={() => console.log('Downloading tourist activity report')}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Tourist Activity Report
            </button>
            <button
              onClick={() => console.log('Downloading safety incidents report')}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Safety Incidents Report
            </button>
            <button
              onClick={() => console.log('Downloading location analytics report')}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Location Analytics Report
            </button>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}