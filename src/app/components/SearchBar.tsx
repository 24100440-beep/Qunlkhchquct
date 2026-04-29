import { Search, Filter } from 'lucide-react';

interface SearchBarProps {
  searchName: string;
  searchEntryDate: string;
  onSearchNameChange: (value: string) => void;
  onSearchEntryDateChange: (value: string) => void;
}

export function SearchBar({
  searchName,
  searchEntryDate,
  onSearchNameChange,
  onSearchEntryDateChange,
}: SearchBarProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-500" />
        <h3 className="font-semibold text-gray-900">Tìm kiếm</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc số hộ chiếu..."
            value={searchName}
            onChange={(e) => onSearchNameChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <input
            type="date"
            value={searchEntryDate}
            onChange={(e) => onSearchEntryDateChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tìm theo ngày nhập cảnh"
          />
        </div>
      </div>
    </div>
  );
}
