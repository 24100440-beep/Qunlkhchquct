import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Traveler, TravelerFormData } from '../types/traveler';
import { mockTravelers } from '../data/mockData';
import { addDays, format } from 'date-fns';

interface TravelerContextType {
  travelers: Traveler[];
  addTraveler: (data: TravelerFormData) => void;
  updateTraveler: (id: string, data: TravelerFormData) => void;
  deleteTraveler: (id: string) => void;
}

const TravelerContext = createContext<TravelerContextType | undefined>(undefined);

const STORAGE_KEY = 'immigration_travelers';

// Load dữ liệu từ localStorage hoặc dùng mock data
function loadTravelers(): Traveler[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error loading travelers:', error);
  }
  return mockTravelers;
}

export function TravelerProvider({ children }: { children: ReactNode }) {
  const [travelers, setTravelers] = useState<Traveler[]>(loadTravelers);

  // Lưu vào localStorage mỗi khi travelers thay đổi
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(travelers));
    } catch (error) {
      console.error('Error saving travelers:', error);
    }
  }, [travelers]);

  const addTraveler = (data: TravelerFormData) => {
    const maxStayDate = format(
      addDays(new Date(data.entryDate), data.maxStayDays),
      'yyyy-MM-dd'
    );

    const newTraveler: Traveler = {
      id: Date.now().toString(),
      ...data,
      maxStayDate,
    };

    setTravelers([...travelers, newTraveler]);
  };

  const updateTraveler = (id: string, data: TravelerFormData) => {
    const maxStayDate = format(
      addDays(new Date(data.entryDate), data.maxStayDays),
      'yyyy-MM-dd'
    );

    setTravelers(
      travelers.map((t) =>
        t.id === id ? { ...t, ...data, maxStayDate } : t
      )
    );
  };

  const deleteTraveler = (id: string) => {
    setTravelers(travelers.filter((t) => t.id !== id));
  };

  return (
    <TravelerContext.Provider
      value={{ travelers, addTraveler, updateTraveler, deleteTraveler }}
    >
      {children}
    </TravelerContext.Provider>
  );
}

export function useTravelers() {
  const context = useContext(TravelerContext);
  if (!context) {
    throw new Error('useTravelers must be used within TravelerProvider');
  }
  return context;
}
