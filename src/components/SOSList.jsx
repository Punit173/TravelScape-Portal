import { useState } from 'react';
import { useSOSAlerts } from '../context/SOSContext';
import SOSCard from './SOSCard';
import { XMarkIcon, ArchiveBoxIcon, BellAlertIcon } from '@heroicons/react/24/outline';

export default function SOSList() {
  const { activeAlerts, resolvedAlerts, loading, error } = useSOSAlerts();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [view, setView] = useState('active'); // 'active' or 'resolved'

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-yellow-500">Loading SOS alerts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
        Error loading SOS alerts: {error.message}
      </div>
    );
  }

  const currentAlerts = view === 'active' ? activeAlerts : resolvedAlerts;

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-yellow-500">
            SOS Alerts Dashboard
          </h2>
          {view === 'active' && activeAlerts.length > 0 && (
            <span className="animate-pulse rounded-full bg-red-500 px-2 py-1 text-xs text-white">
              Live
            </span>
          )}
        </div>

        <div className="flex space-x-4 border-b border-yellow-500/20">
          <button
            onClick={() => setView('active')}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              view === 'active'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-400 hover:border-yellow-500/50 hover:text-yellow-500/70'
            }`}
          >
            <BellAlertIcon className="h-5 w-5" />
            <span>Active Alerts {activeAlerts.length > 0 && `(${activeAlerts.length})`}</span>
          </button>
          <button
            onClick={() => setView('resolved')}
            className={`flex items-center space-x-2 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              view === 'resolved'
                ? 'border-yellow-500 text-yellow-500'
                : 'border-transparent text-gray-400 hover:border-yellow-500/50 hover:text-yellow-500/70'
            }`}
          >
            <ArchiveBoxIcon className="h-5 w-5" />
            <span>Past Alerts {resolvedAlerts.length > 0 && `(${resolvedAlerts.length})`}</span>
          </button>
        </div>
      </div>

      {currentAlerts.length === 0 ? (
        <div className="rounded-lg border border-yellow-500/20 p-8 text-center text-yellow-500">
          <p>{view === 'active' ? 'No active SOS alerts at the moment.' : 'No resolved SOS alerts yet.'}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentAlerts.map((alert) => (
            <SOSCard
              key={alert.id}
              alert={alert}
              onClick={() => setSelectedAlert(alert)}
              isResolved={view === 'resolved'}
            />
          ))}
        </div>
      )}

      {/* Alert Details Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-lg bg-secondary p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-medium text-primary">
                SOS Alert Details
              </h3>
              <button
                onClick={() => setSelectedAlert(null)}
                className="rounded-full p-1 hover:bg-secondary-light"
              >
                <XMarkIcon className="h-5 w-5 text-primary" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-primary-dark">User</h4>
                <p className="text-primary">{selectedAlert.userName}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-primary-dark">User ID</h4>
                <p className="text-primary">{selectedAlert.userId}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-primary-dark">Location</h4>
                <p className="text-primary">
                  {selectedAlert.latitude}, {selectedAlert.longitude}
                </p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-primary-dark">
                  Timestamp
                </h4>
                <p className="text-primary">
                  {selectedAlert.timestamp.toLocaleString()}
                </p>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    window.open(
                      `https://www.google.com/maps?q=${selectedAlert.latitude},${selectedAlert.longitude}`,
                      '_blank'
                    );
                  }}
                  className="flex items-center rounded bg-primary px-4 py-2 text-secondary hover:bg-primary-dark"
                >
                  Open in Maps
                </button>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="rounded bg-secondary-light px-4 py-2 text-primary hover:bg-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}