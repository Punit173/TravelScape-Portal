import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function TouristList({ tourists }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-4">
      {tourists.map((tourist) => (
        <div
          key={tourist.id}
          className="overflow-hidden rounded-lg bg-secondary shadow"
        >
          <div
            className="flex cursor-pointer items-center justify-between p-4 hover:bg-secondary-light"
            onClick={() => setExpandedId(expandedId === tourist.id ? null : tourist.id)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={tourist.avatar || 'https://via.placeholder.com/40'}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-medium text-primary">
                  {tourist.name}
                </h3>
                <p className="text-sm text-primary-dark">
                  ID: {tourist.id}
                </p>
              </div>
            </div>
            <ChevronDownIcon
              className={`h-5 w-5 text-primary transition-transform ${
                expandedId === tourist.id ? 'rotate-180' : ''
              }`}
            />
          </div>
          {expandedId === tourist.id && (
            <div className="border-t border-secondary-light bg-secondary-light p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <h4 className="font-medium text-primary">Contact Information</h4>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center text-primary-dark">
                      <PhoneIcon className="mr-2 h-5 w-5" />
                      {tourist.phone}
                    </div>
                    <div className="flex items-center text-primary-dark">
                      <EnvelopeIcon className="mr-2 h-5 w-5" />
                      {tourist.email}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Location Details</h4>
                  <div className="mt-2 space-y-2 text-primary-dark">
                    <p>Last Known Location: {tourist.lastLocation}</p>
                    <p>Check-in Time: {tourist.lastCheckIn}</p>
                    <p>Status: {tourist.status}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="rounded bg-primary px-3 py-1 text-sm text-secondary hover:bg-primary-dark">
                  Send Alert
                </button>
                <button className="rounded bg-secondary px-3 py-1 text-sm text-primary hover:bg-secondary-light">
                  View History
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}