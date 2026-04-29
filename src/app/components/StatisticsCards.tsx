import { Traveler } from '../types/traveler';
import { differenceInDays } from 'date-fns';
import { Users, UserCheck, AlertTriangle, AlertCircle } from 'lucide-react';

interface StatisticsCardsProps {
  travelers: Traveler[];
}

export function StatisticsCards({ travelers }: StatisticsCardsProps) {
  const today = new Date();

  const activeCount = travelers.filter((t) => !t.exitDate).length;

  const overstayCount = travelers.filter((t) => {
    if (t.exitDate) return false;
    const maxStayDate = new Date(t.maxStayDate);
    return differenceInDays(maxStayDate, today) < 0;
  }).length;

  const criticalCount = travelers.filter((t) => {
    if (t.exitDate) return false;
    const maxStayDate = new Date(t.maxStayDate);
    return differenceInDays(maxStayDate, today) < -7;
  }).length;

  const exitedCount = travelers.filter((t) => t.exitDate).length;

  const stats = [
    {
      label: 'Tổng số du khách',
      value: travelers.length,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Đã xuất cảnh',
      value: exitedCount,
      icon: UserCheck,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Đang lưu trú quá hạn',
      value: overstayCount,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Cảnh báo đỏ (>7 ngày)',
      value: criticalCount,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
