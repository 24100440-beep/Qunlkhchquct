import { TravelerFormData } from '../types/traveler';

const API_BASE_URL = 'http://localhost:8080/api';

// ==========================================
// KHI BACKEND JAVA CHƯA CHẠY:
// Comment tất cả functions này và dùng mock data
// ==========================================

// KHI BACKEND JAVA ĐÃ CHẠY:
// Uncomment các functions dưới đây

/*
export async function getAllTravelers(name?: string, entryDate?: string) {
  const params = new URLSearchParams();
  if (name) params.append('name', name);
  if (entryDate) params.append('entryDate', entryDate);

  const response = await fetch(`${API_BASE_URL}/travelers?${params}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch travelers');
  }

  return result.data;
}

export async function getTravelerById(id: string) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch traveler');
  }

  return result.data;
}

export async function createTraveler(data: TravelerFormData) {
  const response = await fetch(`${API_BASE_URL}/travelers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to create traveler');
  }

  return result.data;
}

export async function updateTraveler(id: string, data: TravelerFormData) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to update traveler');
  }

  return result.data;
}

export async function deleteTraveler(id: string) {
  const response = await fetch(`${API_BASE_URL}/travelers/${id}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to delete traveler');
  }

  return true;
}

export async function getStatistics() {
  const response = await fetch(`${API_BASE_URL}/travelers/statistics`);
  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch statistics');
  }

  return result.data;
}
*/

// ==========================================
// INSTRUCTIONS:
// 1. Chạy backend Java tại: http://localhost:8080
// 2. Test API bằng: GET http://localhost:8080/api/travelers
// 3. Nếu thấy response JSON -> Uncomment code trên
// 4. Comment dòng mock data trong TravelerContext.tsx
// 5. Thêm useEffect để load data từ API
// ==========================================

export const API_READY = false; // Set to true when backend is running
