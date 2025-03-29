// EventsContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface EventData {
  id: number;
  title: string;
  description: string; 
  date: string;
  createdBy: number;
}

interface EventsContextType {
  events: EventData[];
  setEvents: React.Dispatch<React.SetStateAction<EventData[]>>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const EventsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<EventData[]>([]);

  return (
    <EventsContext.Provider value={{ events, setEvents }}>
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