import { useState, useEffect } from 'react';
import { TravelerFormData, Traveler } from '../types/traveler';
import { nationalities, entryPorts, entryReasons } from '../data/mockData';
import { addDays, format } from 'date-fns';
import { X } from 'lucide-react';

interface TravelerFormProps {
  traveler?: Traveler;
  onSubmit: (data: TravelerFormData) => void;
  onCancel: () => void;
}

export function TravelerForm({ traveler, onSubmit, onCancel }: TravelerFormProps) {
  const [formData, setFormData] = useState<TravelerFormData>({
    passportNumber: traveler?.passportNumber || '',
    fullName: traveler?.fullName || '',
    dateOfBirth: traveler?.dateOfBirth || '',
    nationality: traveler?.nationality || '',
    entryDate: traveler?.entryDate || format(new Date(), 'yyyy-MM-dd'),
    entryPort: traveler?.entryPort || '',
    entryLocation: traveler?.entryLocation || '',
    entryReason: traveler?.entryReason || '',
    maxStayDays: traveler?.maxStayDays || 30,
    exitDate: traveler?.exitDate || '',
    exitLocation: traveler?.exitLocation || '',
  });

  const [maxStayDate, setMaxStayDate] = useState('');

  useEffect(() => {
    if (formData.entryDate && formData.maxStayDays) {
      const calculated = format(
        addDays(new Date(formData.entryDate), formData.maxStayDays),
        'yyyy-MM-dd'
      );
      setMaxStayDate(calculated);
    }
  }, [formData.entryDate, formData.maxStayDays]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'maxStayDays' ? parseInt(value) || 0 : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {traveler ? 'Chỉnh sửa thông tin du khách' : 'Thêm du khách mới'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số hộ chiếu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: US123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: John Smith"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ngày tháng năm sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quốc tịch <span className="text-red-500">*</span>
              </label>
              <select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn quốc tịch</option>
                {nationalities.map((nat) => (
                  <option key={nat} value={nat}>
                    {nat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian nhập khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="entryDate"
                value={formData.entryDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cửa khẩu vào <span className="text-red-500">*</span>
              </label>
              <select
                name="entryPort"
                value={formData.entryPort}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn cửa khẩu</option>
                {entryPorts.map((port) => (
                  <option key={port} value={port}>
                    {port}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm cửa khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="entryLocation"
                value={formData.entryLocation}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: Hanoi"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lý do nhập khẩu <span className="text-red-500">*</span>
              </label>
              <select
                name="entryReason"
                value={formData.entryReason}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Chọn lý do</option>
                {entryReasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số ngày lưu trú tối đa <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="maxStayDays"
                value={formData.maxStayDays}
                onChange={handleChange}
                required
                min="1"
                max="365"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời hạn lưu trú tối đa
              </label>
              <input
                type="text"
                value={maxStayDate}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="Tự động tính"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thời gian xuất khẩu
              </label>
              <input
                type="date"
                name="exitDate"
                value={formData.exitDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Địa điểm xuất khẩu
              </label>
              <input
                type="text"
                name="exitLocation"
                value={formData.exitLocation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: Tan Son Nhat Airport"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {traveler ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
