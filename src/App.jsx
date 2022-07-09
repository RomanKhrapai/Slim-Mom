import React from 'react';
import Header from './Components/Header';
import styles from 'App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import CalculatorPage from 'pages/CalculatorPage';
import i18n from './services/i18n/config';
// import { translate } from 'react-i18next';
import { useTranslation } from 'react-i18next';

export const App = () => {

  const isLoggedIn = true;

  const { t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={styles.App}>
      <BrowserRouter basename={'Slim-Mom'}>
        <Header />
        {isLoggedIn ? (
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/diary'} element={<h1>{t('Calculate your daily calorie intake')}</h1>} />
            <Route path={'/calculator'} element={<CalculatorPage />} />
            <Route path={'*'} replace={true} element={<Navigate to={'/'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={'/'} element={<h1>{t('Calculate your daily calorie intake')}</h1>} />
            <Route path={'/registration'} element={<h1>{t('Register')}</h1>} />
            <Route path={'/login'} element={<h1>{t('Sign In')}</h1>} />
            <Route path={'*'} replace={true} element={<Navigate to={'/register'} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};
