import { useTravelers } from '../context/TravelerContext';
import { differenceInDays, format, startOfMonth, endOfMonth, eachMonthOfInterval, subMonths } from 'date-fns';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Globe, Calendar, Activity } from 'lucide-react';

export function StatisticsPage() {
  const { travelers } = useTravelers();
  const today = new Date();

  // Monthly entry data (last 6 months)
  const last6Months = eachMonthOfInterval({
    start: subMonths(today, 5),
    end: today,
  });

  const monthlyData = last6Months.map((month) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);

    const entries = travelers.filter((t) => {
      const entryDate = new Date(t.entryDate);
      return entryDate >= start && entryDate <= end;
    }).length;

    const exits = travelers.filter((t) => {
      if (!t.exitDate) return false;
      const exitDate = new Date(t.exitDate);
      return exitDate >= start && exitDate <= end;
    }).length;

    return {
      month: format(month, 'MM/yyyy'),
      entries,
      exits,
    };
  });

  // Nationality distribution
  const nationalityData = Object.entries(
    travelers.reduce((acc, t) => {
      acc[t.nationality] = (acc[t.nationality] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  )
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  // Entry reasons
  const reasonData = Object.entries(
    travelers.reduce((acc, t) => {
      acc[t.entryReason] = (acc[t.entryReason] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  // Status distribution
  const activeCount = travelers.filter((t) => !t.exitDate).length;
  const exitedCount = travelers.filter((t) => t.exitDate).length;
  const overstayCount = travelers.filter((t) => {
    if (t.exitDate) return false;
    return differenceInDays(new Date(t.maxStayDate), today) < 0;
  }).length;

  const statusData = [
    { name: 'Đang lưu trú', value: activeCount - overstayCount, color: '#3b82f6' },
    { name: 'Đã xuất cảnh', value: exitedCount, color: '#10b981' },
    { name: 'Quá hạn', value: overstayCount, color: '#f59e0b' },
  ];

  const stats = [
    {
      label: 'Trung bình nhập cảnh/tháng',
      value: Math.round(
        monthlyData.reduce((sum, m) => sum + m.entries, 0) / monthlyData.length
      ),
      icon: TrendingUp,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Số quốc tịch',
      value: nationalityData.length,
      icon: Globe,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Thời gian lưu trú TB',
      value: Math.round(
        travelers.reduce((sum, t) => sum + t.maxStayDays, 0) / travelers.length
      ) + ' ngày',
      icon: Calendar,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Tổng giao dịch',
      value: travelers.length,
      icon: Activity,
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Thống kê chi tiết</h1>
        <p className="text-gray-600 mt-1">
          Phân tích dữ liệu xuất nhập cảnh theo thời gian
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
          >
            <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} w-fit mb-4`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Xu hướng nhập/xuất theo tháng
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="entries"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Nhập cảnh"
              />
              <Line
                type="monotone"
                dataKey="exits"
                stroke="#10b981"
                strokeWidth={2}
                name="Xuất cảnh"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Phân bố trạng thái
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Nationalities */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Top 10 quốc tịch
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nationalityData.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" name="Số lượng" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Entry Reasons */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Lý do nhập cảnh
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reasonData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {reasonData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'][index % 6]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
