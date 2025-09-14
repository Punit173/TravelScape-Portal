import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function AlertList({ alerts }) {
  return (
    <div className="rounded-lg bg-secondary p-4 shadow-lg">
      <h2 className="mb-4 text-xl font-bold text-primary">Recent Alerts</h2>
      <div className="space-y-4">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`flex items-start rounded-lg border ${
              alert.severity === 'high'
                ? 'border-red-500 bg-red-500/10'
                : alert.severity === 'medium'
                ? 'border-yellow-500 bg-yellow-500/10'
                : 'border-green-500 bg-green-500/10'
            } p-4`}
          >
            <ExclamationTriangleIcon
              className={`h-5 w-5 flex-shrink-0 ${
                alert.severity === 'high'
                  ? 'text-red-500'
                  : alert.severity === 'medium'
                  ? 'text-yellow-500'
                  : 'text-green-500'
              }`}
            />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-primary">{alert.title}</h3>
              <div className="mt-2 text-sm text-primary-dark">
                <p>{alert.description}</p>
              </div>
              <div className="mt-2">
                <div className="-mx-2 -my-1.5 flex items-center">
                  <button
                    type="button"
                    className="rounded-md bg-primary-dark px-2 py-1.5 text-sm font-medium text-secondary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    View details
                  </button>
                  <button
                    type="button"
                    className="ml-3 rounded-md bg-secondary-light px-2 py-1.5 text-sm font-medium text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-secondary"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}