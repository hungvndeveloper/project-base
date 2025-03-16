import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';

/**
 * Entry point của ứng dụng
 * Render App component vào DOM
 * Bọc trong StrictMode để phát hiện các vấn đề tiềm ẩn
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
