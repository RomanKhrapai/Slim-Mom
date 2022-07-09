import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'App';
import './services/i18n/config';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
