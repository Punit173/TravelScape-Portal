import { useState } from 'react';
import DataTable from './DataTable';
import StatsCard from './StatsCard';
import { BellAlertIcon, ShieldExclamationIcon, ClockIcon } from '@heroicons/react/24/outline';

// Mock data - replace with actual API calls
const mockAlerts = [
  {
    id: 1,
    touristName: "John Doe",
    type: "Location Deviation",
    severity: "High",
    timestamp: "2025-09-14T10:30:00",
    status: "Open",
    location: "Kaziranga National Park"
  },
  // Add more mock data as needed
];

export default function AlertSystem() {
  const [selectedAlert, setSelectedAlert] = useState(null);

  const columns = [
    { key: 'touristName', label: 'Tourist Name', sortable: true },
    { key: 'type', label: 'Alert Type', sortable: true },
    {
      key: 'severity',
      label: 'Severity',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.severity === 'Low' ? 'bg-green-100 text-green-800' :
          row.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {row.severity}
        </span>
      )
    },
    {
      key: 'timestamp',
      label: 'Time',
      sortable: true,
      render: (row) => new Date(row.timestamp).toLocaleString()
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Resolved' ? 'bg-green-100 text-green-800' :
          row.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status}
        </span>
      )
    },
    { key: 'location', label: 'Location', sortable: true }
  ];

  const stats = [
    {
      title: "Active Alerts",
      value: "12",
      icon: BellAlertIcon,
      trend: { direction: "down", value: "-25% " },
      color: "red"
    },
    {
      title: "High Risk Cases",
      value: "3",
      icon: ShieldExclamationIcon,
      trend: { direction: "neutral", value: "No change " },
      color: "yellow"
    },
    {
      title: "Avg Response Time",
      value: "8m",
      icon: ClockIcon,
      trend: { direction: "up", value: "-2m " },
      color: "green"
    }
  ];

  const handleAlertAction = (action, alert) => {
    console.log(`Action taken: ${action}`, alert);
    // Implement alert action handling
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Active Alerts</h3>
        </div>
        <div className="p-6">
          <DataTable
            columns={columns}
            data={mockAlerts}
            onRowClick={setSelectedAlert}
          />
        </div>
      </div>

      {selectedAlert && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-medium text-gray-900">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <pre>{JSON.stringify(selectedAlert, null, 2)}</pre>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleAlertAction('acknowledge', selectedAlert)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => handleAlertAction('resolve', selectedAlert)}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700"
                >
                  Resolve
                </button>
                <button
                  onClick={() => handleAlertAction('escalate', selectedAlert)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
                >
                  Escalate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}