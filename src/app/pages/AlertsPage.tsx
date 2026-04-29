import { useTravelers } from '../context/TravelerContext';
import { differenceInDays } from 'date-fns';
import { AlertCircle, AlertTriangle, Clock, User } from 'lucide-react';

export function AlertsPage() {
  const { travelers } = useTravelers();
  const today = new Date();

  const overstayTravelers = travelers
    .filter((t) => {
      if (t.exitDate) return false;
      const maxStayDate = new Date(t.maxStayDate);
      return differenceInDays(maxStayDate, today) < 0;
    })
    .map((t) => ({
      ...t,
      daysOverstay: Math.abs(differenceInDays(new Date(t.maxStayDate), today)),
    }))
    .sort((a, b) => b.daysOverstay - a.daysOverstay);

  const criticalAlerts = overstayTravelers.filter((t) => t.daysOverstay > 7);
  const warningAlerts = overstayTravelers.filter(
    (t) => t.daysOverstay > 0 && t.daysOverstay <= 7
  );

  const expiringSoon = travelers
    .filter((t) => {
      if (t.exitDate) return false;
      const daysRemaining = differenceInDays(new Date(t.maxStayDate), today);
      return daysRemaining > 0 && daysRemaining <= 7;
    })
    .map((t) => ({
      ...t,
      daysRemaining: differenceInDays(new Date(t.maxStayDate), today),
    }))
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Cảnh báo và Thông báo</h1>
        <p className="text-gray-600 mt-1">
          Theo dõi các trường hợp cần xử lý khẩn cấp
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h3 className="font-bold text-red-900">Cảnh báo đỏ</h3>
          </div>
          <p className="text-3xl font-bold text-red-600">{criticalAlerts.length}</p>
          <p className="text-sm text-red-700 mt-1">Quá hạn trên 7 ngày</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-6 h-6 text-orange-600" />
            <h3 className="font-bold text-orange-900">Cảnh báo vàng</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">{warningAlerts.length}</p>
          <p className="text-sm text-orange-700 mt-1">Quá hạn 1-7 ngày</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-blue-600" />
            <h3 className="font-bold text-blue-900">Sắp hết hạn</h3>
          </div>
          <p className="text-3xl font-bold text-blue-600">{expiringSoon.length}</p>
          <p className="text-sm text-blue-700 mt-1">Còn dưới 7 ngày</p>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">
                Cảnh báo đỏ - Ưu tiên cao ({criticalAlerts.length})
              </h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {criticalAlerts.map((traveler) => (
              <div
                key={traveler.id}
                className="p-6 hover:bg-red-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {traveler.fullName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                          {traveler.fullName}
                          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">
                            Quá hạn {traveler.daysOverstay} ngày
                          </span>
                        </h3>
                        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Số hộ chiếu</p>
                            <p className="font-medium text-gray-900">
                              {traveler.passportNumber}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Quốc tịch</p>
                            <p className="font-medium text-gray-900">
                              {traveler.nationality}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Hạn lưu trú</p>
                            <p className="font-medium text-red-600">
                              {new Date(traveler.maxStayDate).toLocaleDateString('vi-VN')}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Cửa khẩu</p>
                            <p className="font-medium text-gray-900">
                              {traveler.entryPort}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning Alerts */}
      {warningAlerts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">
                Cảnh báo vàng - Cần xử lý ({warningAlerts.length})
              </h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {warningAlerts.map((traveler) => (
              <div
                key={traveler.id}
                className="p-6 hover:bg-orange-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {traveler.fullName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {traveler.fullName}
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                        Quá hạn {traveler.daysOverstay} ngày
                      </span>
                    </h3>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Số hộ chiếu</p>
                        <p className="font-medium text-gray-900">
                          {traveler.passportNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Quốc tịch</p>
                        <p className="font-medium text-gray-900">
                          {traveler.nationality}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hạn lưu trú</p>
                        <p className="font-medium text-orange-600">
                          {new Date(traveler.maxStayDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cửa khẩu</p>
                        <p className="font-medium text-gray-900">
                          {traveler.entryPort}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expiring Soon */}
      {expiringSoon.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-white" />
              <h2 className="text-xl font-bold text-white">
                Sắp hết hạn - Theo dõi ({expiringSoon.length})
              </h2>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {expiringSoon.map((traveler) => (
              <div
                key={traveler.id}
                className="p-6 hover:bg-blue-50 transition"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {traveler.fullName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {traveler.fullName}
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        Còn {traveler.daysRemaining} ngày
                      </span>
                    </h3>
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Số hộ chiếu</p>
                        <p className="font-medium text-gray-900">
                          {traveler.passportNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Quốc tịch</p>
                        <p className="font-medium text-gray-900">
                          {traveler.nationality}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Hạn lưu trú</p>
                        <p className="font-medium text-blue-600">
                          {new Date(traveler.maxStayDate).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Cửa khẩu</p>
                        <p className="font-medium text-gray-900">
                          {traveler.entryPort}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Alerts */}
      {criticalAlerts.length === 0 &&
        warningAlerts.length === 0 &&
        expiringSoon.length === 0 && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Không có cảnh báo
            </h3>
            <p className="text-gray-600">
              Tất cả du khách đang lưu trú trong thời hạn cho phép
            </p>
          </div>
        )}
    </div>
  );
}
