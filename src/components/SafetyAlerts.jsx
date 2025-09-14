import { useState } from 'react';
import { MegaphoneIcon, XMarkIcon } from '@heroicons/react/24/outline';

const severityColors = {
  high: 'border-red-500 bg-red-500/10',
  medium: 'border-yellow-500 bg-yellow-500/10',
  low: 'border-green-500 bg-green-500/10',
};

const severityTextColors = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500',
};

export default function SafetyAlerts({ alerts, onDismiss, onBroadcast }) {
  const [selectedAlert, setSelectedAlert] = useState(null);

  return (
    <div className="space-y-4">
      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-lg bg-secondary p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-primary">Alert Details</h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-full p-1 hover:bg-secondary-light"
              >
                <XMarkIcon className="h-5 w-5 text-primary" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-primary-dark">Location</h4>
                <p className="text-primary">{selectedAlert.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary-dark">Description</h4>
                <p className="text-primary">{selectedAlert.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-primary-dark">Affected Tourists</h4>
                <p className="text-primary">{selectedAlert.affectedTourists} tourists in the area</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => onBroadcast(selectedAlert)}
                  className="flex items-center rounded bg-primary px-4 py-2 text-secondary hover:bg-primary-dark"
                >
                  <MegaphoneIcon className="mr-2 h-5 w-5" />
                  Broadcast Alert
                </button>
                <button
                  onClick={() => {
                    onDismiss(selectedAlert.id);
                    setSelectedAlert(null);
                  }}
                  className="rounded bg-secondary-light px-4 py-2 text-primary hover:bg-secondary"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts List */}
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 ${severityColors[alert.severity]}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <div
                  className={`mr-2 h-2 w-2 rounded-full ${
                    severityTextColors[alert.severity]
                  }`}
                />
                <h3 className={`font-medium ${severityTextColors[alert.severity]}`}>
                  {alert.title}
                </h3>
              </div>
              <p className="mt-1 text-sm text-primary-dark">{alert.description}</p>
              <div className="mt-2 flex items-center space-x-4 text-sm text-primary-dark">
                <span>{alert.location}</span>
                <span>•</span>
                <span>{alert.time}</span>
                <span>•</span>
                <span>{alert.affectedTourists} affected</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedAlert(alert)}
              className="ml-4 rounded bg-secondary px-3 py-1 text-sm text-primary hover:bg-secondary-light"
            >
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}