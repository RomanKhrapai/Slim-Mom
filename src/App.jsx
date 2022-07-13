import { React, lazy, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import i18n from './services/i18n/config';
import { useTranslation } from 'react-i18next';
import CalculatorPage from 'pages/CalculatorPage';
import Header from 'components/Header';
import styles from 'App.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const LoginView = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));

export const App = () => {
  const isLoggedIn = true;

  const { t } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className={styles.App}>
      <BrowserRouter basename={'Slim-Mom'}>

<Provider store={store}>
        <Header />
        <Suspense fallback={<div>LOADER</div>}>
          {isLoggedIn ? (
            <Routes>
              <Route path={'/'} element={<MainPage />} />
              <Route path={'/diary'} element={<DiaryPage />} />
              <Route path={'/calculator'} element={<CalculatorPage />} />
            <Route path={'*'} replace={true} element={<Navigate to={'/'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path={'/'}
              element={<h1   style={{marginTop: '200px'}}>{t('Calculate your daily calorie intake')}</h1>}
              />
            <Route path={'/registration'} element={<RegisterView />} />
            <Route path={'/login'} element={<LoginView />} />

            <Route
              path={'*'}
              replace={true}
              element={<Navigate to={'/registration'} />}
              />
          </Routes>
        )}
        </Suspense>
        </Provider>
       </BrowserRouter>
      <ToastContainer autoClose={3000} />
    </div>
  );
};
