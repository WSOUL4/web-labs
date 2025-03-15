import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import HomePage from './pages/Main/main';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <HomePage />
    </div>
  )
}

export default App
