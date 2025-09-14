export default function StatsCard({ title, value, icon: Icon, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-800',
    red: 'bg-red-50 text-red-800',
    green: 'bg-green-50 text-green-800',
    yellow: 'bg-yellow-50 text-yellow-800',
    purple: 'bg-purple-50 text-purple-800'
  };

  const trendColorClasses = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600'
  };

  return (
    <div className={`${colorClasses[color]} p-6 rounded-lg shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-75">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          {trend && (
            <p className={`mt-2 text-sm ${trendColorClasses[trend.direction]}`}>
              {trend.value}
              {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}
            </p>
          )}
        </div>
        {Icon && (
          <div className="p-3 rounded-full bg-opacity-20 bg-white">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}