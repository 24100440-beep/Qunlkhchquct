import { useTravelers } from '../context/TravelerContext';
import { differenceInDays } from 'date-fns';
import {
  Users,
  UserCheck,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  Globe,
} from 'lucide-react';
import { Link } from 'react-router';

export function DashboardPage() {
  const { travelers } = useTravelers();
  const today = new Date();

  console.log(travelers);

  const activeCount = travelers?.data.filter((t) => !t.exitDate).length;
  const exitedCount = travelers?.data.filter((t) => t.exitDate).length;
const testdata=travelers?.data|| [];
const overstayCount = travelers?.data.filter((t) => {
    if (t.exitDate) return false;
    const maxStayDate = new Date(t.maxStayDate);
    return differenceInDays(maxStayDate, today) < 0;
  }).length;

  const criticalCount = testdata.filter((t) => {
    if (t.exitDate) return false;
    const maxStayDate = new Date(t.maxStayDate);
    return differenceInDays(maxStayDate, today) < -7;
  }).length;

  const recentTravelers = testdata
    .sort((a, b) => new Date(b.entryDate).getTime() - new Date(a.entryDate).getTime())
    .slice(0, 5);
// const testdata=travelers?.data|| [];

  const topNationalities = Object.entries(
    testdata.reduce((acc, t) => {
      acc[t.nationality] = (acc[t.nationality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const stats = [
    {
      label: 'Tổng số du khách',
      value: travelers?.data.length || 0,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      change: '+12%',
    },
    {
      label: 'Đang lưu trú',
      value: activeCount,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      change: '+8%',
    },
    {
      label: 'Đã xuất cảnh',
      value: exitedCount,
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      change: '+5%',
    },
    {
      label: 'Quá hạn lưu trú',
      value: overstayCount,
      icon: AlertTriangle,
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      change: '-3%',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-8 text-white shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Chào mừng đến với hệ thống quản lý</h1>
        <p className="text-blue-100">
          Theo dõi và quản lý thông tin du khách quốc tế tại các cửa khẩu
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Critical Alert */}
      {criticalCount > 0 && (
        <Link
          to="/alerts"
          className="block bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-xl p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-500 rounded-xl">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-red-900 text-lg">
                Cảnh báo: {criticalCount} du khách quá hạn trên 7 ngày
              </h3>
              <p className="text-red-700 text-sm">
                Nhấn để xem chi tiết và xử lý ngay
              </p>
            </div>
            <div className="text-red-600">→</div>
          </div>
        </Link>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Travelers */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Du khách mới nhất
            </h3>
            <Link
              to="/travelers"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Xem tất cả →
            </Link>
          </div>
          <div className="space-y-4">
            {recentTravelers.map((traveler) => (
              <div
                key={traveler.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {traveler.fullName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{traveler.fullName}</p>
                  <p className="text-sm text-gray-500">{traveler.nationality}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(traveler.entryDate).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="text-xs text-gray-500">{traveler.entryPort}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Nationalities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-gray-900">
              Quốc tịch phổ biến
            </h3>
          </div>
          <div className="space-y-4">
            {topNationalities.map(([nationality, count], index) => {
              const percentage = (count / testdata.length) * 100;
              return (
                <div key={nationality}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {index + 1}. {nationality}
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {count} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
