import React from 'react';
import Header from './Components/Header';
import styles from 'App.module.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import MainPage from 'pages/MainPage';

export const App = () => {
  const isLoggedIn = true;

  return (
    <div className={styles.App}>
      <BrowserRouter basename={'Slim-Mom'}>
        <Header />
        {isLoggedIn ? (
          <Routes>
            <Route path={'/'} element={<MainPage />} />
            <Route path={'/diary'} element={<h1>Diary Private Component</h1>} />
            <Route
              path={'/calculator'}
              element={<h1>Calculator Private Component</h1>}
            />
            <Route path={'*'} replace={true} element={<Navigate to={'/'} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path={'/'} element={<h1>Main Public Component</h1>} />
            <Route
              path={'/registration'}
              element={<h1>Registration Component</h1>}
            />
            <Route path={'/login'} element={<h1>Login Component</h1>} />
            <Route
              path={'*'}
              replace={true}
              element={<Navigate to={'/register'} />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
};
