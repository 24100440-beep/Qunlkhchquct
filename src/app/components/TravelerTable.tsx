import { Traveler } from '../types/traveler';
import { Edit, Trash2, CheckCircle, AlertCircle } from 'lucide-react';
import { differenceInDays } from 'date-fns';

interface TravelerTableProps {
  travelers: Traveler[] | undefined;
  onEdit: (traveler: Traveler) => void;
  onDelete: (id: string) => void;
}

export function TravelerTable({ travelers, onEdit, onDelete }: TravelerTableProps) {
  const getStatusInfo = (traveler: Traveler) => {
    const today = new Date();
    const maxStayDate = new Date(traveler.maxStayDate);
    const daysRemaining = differenceInDays(maxStayDate, today);

    if (traveler.exitDate) {
      return {
        status: 'exited',
        label: 'Đã xuất cảnh',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      };
    }

    if (daysRemaining < -7) {
      return {
        status: 'critical',
        label: `Quá hạn ${Math.abs(daysRemaining)} ngày`,
        color: 'text-red-600',
        bgColor: 'bg-red-50',
      };
    }

    if (daysRemaining < 0) {
      return {
        status: 'overstay',
        label: `Quá hạn ${Math.abs(daysRemaining)} ngày`,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
      };
    }

    return {
      status: 'active',
      label: `Còn ${daysRemaining} ngày`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    };
  };

  if (travelers?.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Không tìm thấy du khách nào</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              STT
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Số hộ chiếu
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Họ và tên
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quốc tịch
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ngày nhập cảnh
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cửa khẩu
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hạn lưu trú
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {travelers?.map((traveler, index) => {
            const statusInfo = getStatusInfo(traveler);
            return (
              <tr
                key={traveler.id}
                className={`hover:bg-gray-50 transition ${
                  statusInfo.status === 'critical' ? 'bg-red-50/50' : ''
                }`}
              >
                <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  {traveler.passportNumber}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {traveler.fullName}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {traveler.nationality}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(traveler.entryDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {traveler.entryPort}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {new Date(traveler.maxStayDate).toLocaleDateString('vi-VN')}
                </td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} ${statusInfo.bgColor}`}
                  >
                    {statusInfo.status === 'exited' ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : statusInfo.status === 'critical' ? (
                      <AlertCircle className="w-3 h-3" />
                    ) : null}
                    {statusInfo.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(traveler)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      title="Chỉnh sửa"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Bạn có chắc muốn xóa du khách ${traveler.fullName}?`
                          )
                        ) {
                          onDelete(traveler.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
