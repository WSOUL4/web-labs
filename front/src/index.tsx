import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './components/store/store';
/*
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);*/


const container = document.getElementById('root');
const root = createRoot(container!); 

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);