import { useState, useMemo } from 'react';
import { useTravelers } from '../context/TravelerContext';
import { Traveler } from '../types/traveler';
import { TravelerForm } from '../components/TravelerForm';
import { TravelerTable } from '../components/TravelerTable';
import { SearchBar } from '../components/SearchBar';
import { Plus } from 'lucide-react';

export function TravelersPage() {
  const { travelers, addTraveler, updateTraveler, deleteTraveler } = useTravelers();
  const [showForm, setShowForm] = useState(false);
  const [editingTraveler, setEditingTraveler] = useState<Traveler | undefined>();
  const [searchName, setSearchName] = useState('');
  const [searchEntryDate, setSearchEntryDate] = useState('');

  const filteredTravelers = useMemo(() => {
    return travelers.filter((traveler) => {
      const nameMatch =
        searchName === '' ||
        traveler.fullName.toLowerCase().includes(searchName.toLowerCase()) ||
        traveler.passportNumber.toLowerCase().includes(searchName.toLowerCase());

      const dateMatch =
        searchEntryDate === '' || traveler.entryDate === searchEntryDate;

      return nameMatch && dateMatch;
    });
  }, [travelers, searchName, searchEntryDate]);

  const handleEdit = (traveler: Traveler) => {
    setEditingTraveler(traveler);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingTraveler(undefined);
  };

  const handleSubmit = (data: any) => {
    if (editingTraveler) {
      updateTraveler(editingTraveler.id, data);
    } else {
      addTraveler(data);
    }
    setShowForm(false);
    setEditingTraveler(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quản lý du khách</h1>
          <p className="text-gray-600 mt-1">
            Thêm, sửa, xóa và tìm kiếm thông tin du khách
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-xl"
        >
          <Plus className="w-5 h-5" />
          Thêm du khách mới
        </button>
      </div>

      {/* Search */}
      <SearchBar
        searchName={searchName}
        searchEntryDate={searchEntryDate}
        onSearchNameChange={setSearchName}
        onSearchEntryDateChange={setSearchEntryDate}
      />

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500">
        <p className="text-gray-600">
          Hiển thị <span className="font-bold text-blue-600">{filteredTravelers.length}</span> / {travelers.length} du khách
        </p>
      </div>

      {/* Table */}
      <TravelerTable
        travelers={filteredTravelers}
        onEdit={handleEdit}
        onDelete={deleteTraveler}
      />

      {/* Form Modal */}
      {showForm && (
        <TravelerForm
          traveler={editingTraveler}
          onSubmit={handleSubmit}
          onCancel={handleCancelForm}
        />
      )}
    </div>
  );
}
