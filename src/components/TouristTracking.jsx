import { useState } from 'react';
import DataTable from './DataTable';
import StatsCard from './StatsCard';
import TouristMap from './TouristMap';
import { UserIcon, ExclamationCircleIcon, MapPinIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API calls
  const mockTourists = [
    {
      id: 1,
      name: "John Doe",
      location: "Assam",
      status: "Active",
      safetyScore: 85,
      lastSeen: "2025-09-14T10:30:00",
      riskLevel: "Low",
      coordinates: { x: 0.6, y: 0.4 }
    },
    {
      id: 2,
      name: "Jane Smith",
      location: "Meghalaya",
      status: "Active",
      safetyScore: 92,
      lastSeen: "2025-09-14T10:35:00",
      riskLevel: "Low",
      coordinates: { x: 0.3, y: 0.7 }
    },
    {
      id: 3,
      name: "Mike Johnson",
      location: "Arunachal Pradesh",
      status: "Active",
      safetyScore: 65,
      lastSeen: "2025-09-14T10:25:00",
      riskLevel: "Medium",
      coordinates: { x: 0.8, y: 0.2 }
    }
  ];export default function TouristTracking() {
  const [selectedTourist, setSelectedTourist] = useState(null);

  const columns = [
    { key: 'name', label: 'Tourist Name', sortable: true },
    { key: 'location', label: 'Current Location', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { 
      key: 'safetyScore', 
      label: 'Safety Score', 
      sortable: true,
      render: (row) => (
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            row.safetyScore >= 80 ? 'bg-green-500' :
            row.safetyScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          {row.safetyScore}
        </div>
      )
    },
    { 
      key: 'lastSeen', 
      label: 'Last Seen',
      sortable: true,
      render: (row) => new Date(row.lastSeen).toLocaleString()
    },
    { 
      key: 'riskLevel', 
      label: 'Risk Level',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.riskLevel === 'Low' ? 'bg-green-100 text-green-800' :
          row.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.riskLevel}
        </span>
      )
    }
  ];

  const stats = [
    {
      title: "Active Tourists",
      value: "156",
      icon: UserIcon,
      trend: { direction: "up", value: "+12% " },
      color: "blue"
    },
    {
      title: "High Risk Areas",
      value: "3",
      icon: ExclamationCircleIcon,
      trend: { direction: "neutral", value: "No change " },
      color: "red"
    },
    {
      title: "Average Safety Score",
      value: "85",
      icon: MapPinIcon,
      trend: { direction: "up", value: "+5% " },
      color: "green"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Tourist Tracking</h3>
          </div>
          <div className="p-6">
            <DataTable
              columns={columns}
              data={mockTourists}
              onRowClick={setSelectedTourist}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Live Map</h3>
          </div>
          <div className="p-6">
            <TouristMap tourists={mockTourists} selectedTourist={selectedTourist} />
          </div>
        </div>
      </div>

      {selectedTourist && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">Tourist Details</h3>
              <button
                onClick={() => setSelectedTourist(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="mt-4">
              <pre className="bg-gray-50 p-4 rounded">
                {JSON.stringify(selectedTourist, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}