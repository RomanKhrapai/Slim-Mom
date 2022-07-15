import React from 'react';
import ReactDOM from 'react-dom';
// import { ThemeProvider } from 'components/ThemeProvider/ThemeProvider';
import 'react-toastify/dist/ReactToastify.css';
import { App } from 'App';
import './services/i18n/config';
import './index.css';
import './fonts/Verdana/Verdana.ttf';
import './fonts/Verdana/Verdana-Bold.ttf';
import './fonts/Gotham-Pro/GothamPro-Bold.ttf';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
    {/* <ThemeProvider> */}
    <App />
    {/* </ThemeProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
