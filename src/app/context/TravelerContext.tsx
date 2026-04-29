import { createContext, useContext, useState, ReactNode } from 'react';
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

export function TravelerProvider({ children }: { children: ReactNode }) {
  const [travelers, setTravelers] = useState<Traveler[]>(mockTravelers);

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
