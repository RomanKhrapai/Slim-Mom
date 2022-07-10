import { React, lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import i18n from './services/i18n/config';

import { useTranslation } from 'react-i18next';
import CalculatorPage from 'pages/CalculatorPage';
import Header from 'components/Header';
import styles from 'App.module.scss';

const LoginView = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('pages/MainPage'));

export const App = () => {
  const isLoggedIn = true;

  const { t } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.App}>
      <BrowserRouter basename={'Slim-Mom'}>
        <Header />m
        {isLoggedIn ? (
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route
              path={'/diary'}
              element={<h1>{t('Calculate your daily calorie intake')}</h1>}
            />
            <Route path={'/calculator'} element={<CalculatorPage />} />

            <Route path={'*'} replace={true} element={<Navigate to={'/'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route
              path={'/'}
              element={<h1>{t('Calculate your daily calorie intake')}</h1>}
            />
            <Route path={'/registration'} element={<RegisterView />} />
            <Route path={'/login'} element={<LoginView />} />

            <Route
              path={'*'}
              replace={true}
              element={<Navigate to={'/register'} />}
            />
          </Routes>
        )}
      </BrowserRouter>

      <ToastContainer autoClose={3000} />
    </div>
  );
};
