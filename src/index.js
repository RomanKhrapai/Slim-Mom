import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider';
import 'react-toastify/dist/ReactToastify.css';
import { App } from 'App';
import './services/i18n/config';
import './index.css';
import './fonts/Verdana/Verdana.ttf';
import './fonts/Verdana/Verdana-Bold.ttf';
import './fonts/Gotham-Pro/GothamPro-Bold.ttf';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
