import { createContext, useContext, useState, ReactNode,useEffect } from 'react';
import { Traveler, TravelerFormData } from '../types/traveler';
// import { mockTravelers } from '../data/mockData';
import { addDays, format } from 'date-fns';
import { DataResponse } from '../types/traveler';


interface TravelerContextType {
  travelers: DataResponse | undefined;
  addTraveler: (data: TravelerFormData) => void;
  updateTraveler: (id: string, data: TravelerFormData) => void;
  deleteTraveler: (id: string) => void;
}

const TravelerContext = createContext<TravelerContextType | undefined>(undefined);

export function TravelerProvider({ children }: { children: ReactNode }) {
  const [travelers, setTravelers] = useState< DataResponse>();
const gettravelers = async () => { 
  const data= await fetch('http://localhost:8080/api/travelers')
  const travelersData = await data.json();
  setTravelers(travelersData);
};
useEffect(() => {
  gettravelers();
}, []);

  const addTraveler = async (data: TravelerFormData) => {
    const maxStayDate = format(

      addDays(new Date(data.entryDate), data.maxStayDays),
      'yyyy-MM-dd'
    );

    const newTraveler: Traveler = {
      id: Date.now().toString(),
      ...data,
      maxStayDate,
    };
    await fetch('http://localhost:8080/api/travelers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTraveler),
    });
    alert('Thêm du khách thành công!');
    gettravelers();

  };

  const updateTraveler = async (id: string, data: TravelerFormData) => {
    const maxStayDate = format(
      addDays(new Date(data.entryDate), data.maxStayDays),
      'yyyy-MM-dd'
    );
    const updatedTraveler: Traveler = {
      id,
      ...data,
      maxStayDate,
    };
    await fetch(`http://localhost:8080/api/travelers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },      body: JSON.stringify(updatedTraveler),
    });
    alert('Cập nhật du khách thành công!');
    gettravelers(); 

    // setTravelers(
    //   travelers.map((t) =>
    //     t.id === id ? { ...t, ...data, maxStayDate } : t
    //   )
    // );
  };

  const deleteTraveler = async (id: string) => {
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa du khách này?');
    if (!confirmDelete) return;
    await fetch(`http://localhost:8080/api/travelers/${id}`, {
      method: 'DELETE',
    });
    alert('Xóa du khách thành công!');
    gettravelers(); 
    // setTravelers(travelers.filter((t) => t.id !== id));
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
