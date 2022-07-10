import React from 'react';
import ReactDOM from 'react-dom/client';

import 'react-toastify/dist/ReactToastify.css';
import { App } from 'App';
import './services/i18n/config';
import './index.css';
import './fonts/Verdana/Verdana.ttf';
import './fonts/Verdana/Verdana-Bold.ttf';
import './fonts/Gotham-Pro/GothamPro-Bold.ttf';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
