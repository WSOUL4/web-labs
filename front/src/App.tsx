import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import React from 'react';
import HomePage from './pages/Main/main';
import LoginPage from './pages/Login/login';
import EventPage from './pages/Events/events';
import RegisterPage from './pages/Register/register';
import NotFoundPage from './pages/404/404';
import { EventsProvider } from './pages/Events/components/eventsContext';
/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <HomePage />
    </div>
  )
}*/
const App: React.FC = () => {
  return (
    <EventsProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/events" element={<EventPage />} />
        {/* Соответствие для всех остальных маршрутов */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
    </EventsProvider>
  );
};

export default App;
