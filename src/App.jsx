import { ToastContainer } from 'react-toastify';

import { React, lazy } from 'react';

import Header from './Components/Header';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';
import CalculatorPage from 'pages/CalculatorPage';

import AuthNav from 'components/AuthNav/AuthNav';

import styles from 'App.module.scss';

const LoginView = lazy(() => import('pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('pages/RegisterPage/RegisterPage'));
const HomeView = lazy(() => import('pages/MainPage/MainPage'));

export const App = () => {
  const isLoggedIn = true;

  return (
    <div className={styles.App}>
      <BrowserRouter basename={'Slim-Mom'}>
        <AuthNav />
        <Header />
        {isLoggedIn ? (
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/diary'} element={<h1>Diary Private Component</h1>} />
            <Route path={'/calculator'} element={<CalculatorPage />} />
            <Route path={'*'} replace={true} element={<Navigate to={'/'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={'/'} element={<h1>Main Public Component</h1>} />
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
