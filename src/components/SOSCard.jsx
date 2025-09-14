import { ExclamationTriangleIcon, MapPinIcon, UserIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';
import { useSOSAlerts } from '../context/SOSContext';
import { useState } from 'react';

export default function SOSCard({ alert, onClick, isResolved }) {
  const { resolveSOSAlert } = useSOSAlerts();
  const [isResolving, setIsResolving] = useState(false);
  return (
    <div 
      className="cursor-pointer rounded-lg bg-secondary p-4 shadow-lg ring-1 ring-red-500/50 transition-all hover:ring-2 hover:ring-red-500"
      onClick={onClick}
    >
      <div className="flex items-start space-x-4">
        <div className="rounded-full bg-red-500/10 p-2">
          <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-primary-dark" />
              <h3 className="font-medium text-primary">{alert.userName}</h3>
            </div>
            <span className="flex items-center text-sm text-primary-dark">
              <ClockIcon className="mr-1 h-4 w-4" />
              {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
            </span>
          </div>
          
          <div className="mt-2 flex items-center space-x-2 text-sm text-primary-dark">
            <MapPinIcon className="h-4 w-4" />
            <span>
              {alert.latitude.toFixed(6)}, {alert.longitude.toFixed(6)}
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isResolved ? (
                <>
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-medium text-green-500">
                    Resolved {formatDistanceToNow(alert.resolvedAt, { addSuffix: true })}
                  </span>
                </>
              ) : (
                <>
                  <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
                  <span className="text-sm font-medium text-red-500">
                    Active SOS
                  </span>
                </>
              )}
            </div>
            <div className="flex space-x-2">
              {!isResolved && (
                <button
                  className="rounded bg-yellow-500 px-3 py-1 text-sm text-black hover:bg-yellow-600 disabled:opacity-50 flex items-center space-x-1"
                  onClick={async (e) => {
                    e.stopPropagation();
                    setIsResolving(true);
                    try {
                      await resolveSOSAlert(alert.id);
                    } finally {
                      setIsResolving(false);
                    }
                  }}
                  disabled={isResolving}
                >
                  <CheckCircleIcon className="h-4 w-4" />
                  <span>{isResolving ? 'Resolving...' : 'Resolve'}</span>
                </button>
              )}
              <button
                className="rounded bg-yellow-500 px-3 py-1 text-sm text-black hover:bg-yellow-600"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(
                    `https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`,
                    '_blank'
                  );
                }}
              >
                View on Map
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}