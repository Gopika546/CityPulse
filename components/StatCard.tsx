'use client';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp, 
  color = 'blue' 
}: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    red: 'bg-red-500 text-white',
    purple: 'bg-purple-500 text-white',
    indigo: 'bg-indigo-500 text-white'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color as keyof typeof colorClasses] || colorClasses.blue}`}>
          <i className={`${icon} text-xl`}></i>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
      {trend && (
        <div className="mt-4">
          <div className={`flex items-center text-sm ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
            <i className={`ri-arrow-${trendUp ? 'up' : 'down'}-line mr-1`}></i>
            <span>{trend}</span>
          </div>
        </div>
      )}
    </div>
  );
}