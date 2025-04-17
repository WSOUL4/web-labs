// EventsContext.tsx
import React, { createContext, useContext, useState } from 'react';

export interface EventData {
  id: number;
  title: string;
  description: string; 
  date: string;
  createdBy: number;
  location:string;
}
export interface EventDataAdd {
  title: string;
  description: string; 
  date: string|Date;
  createdBy: number;
}

interface EventsContextType {
  events: EventData[];
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
  clearEvents: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([]);
  const clearEvents = () => {
    setEvents([]); // Очищаем массив событий
  };
  return (
    <EventsContext.Provider value={{ events, setEvents, clearEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};