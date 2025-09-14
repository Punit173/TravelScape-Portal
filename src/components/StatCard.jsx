import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

export default function StatCard({ title, value, change, type }) {
  const isPositive = change > 0;
  
  return (
    <div className="rounded-lg bg-secondary p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-primary">{title}</h3>
        <div className={`flex items-center ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          {isPositive ? (
            <ArrowUpIcon className="h-5 w-5" />
          ) : (
            <ArrowDownIcon className="h-5 w-5" />
          )}
          <span className="ml-1 text-sm">{Math.abs(change)}%</span>
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-primary">{value}</p>
      <div className="mt-4">
        <div className="h-2 w-full rounded-full bg-secondary-light">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${Math.min(Math.abs(change), 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}