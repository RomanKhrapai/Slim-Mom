import { React, lazy, Suspense, useState, useContext, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from './services/i18n/config';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import authOperations from 'redux/auth/auth-operations';
import authSelectors from 'redux/auth/auth-selectors';
import Header from 'components/Header';
import Loader from 'components/Loader';
import { PrivateRoute, PublicRoute } from 'components/Routers';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';

import s from 'App.module.scss';

const LoginView = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage/CalculatorPage'));

export const App = () => {
  const [{ theme}] = useContext(ThemeContext);
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurent);
  const isAuthorised = useSelector(authSelectors.getIsAuthorised);

  const { t } = useTranslation();
  const changeLanguage = lng => i18n.changeLanguage(lng);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage !== 'uk') {
      changeLanguage('en');
    }

    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div
      className={showModal ? s.overflow_hidden : undefined}
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      {/* <div className={showModal ? s.overflow_hidden : undefined}>  */}
      {isFetchingCurrentUser ? (
        <Loader />
      ) : (
        <>
          <Header />
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route
                  index
                  element={
                    <PublicRoute>
                      <MainPage
                        toggleModal={toggleModal}
                        showModal={showModal}
                      />
                    </PublicRoute>
                  }
                />
                <Route
                  path={'/diary'}
                  element={
                    <PrivateRoute>
                      <DiaryPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={'/calculator'}
                  element={
                    <PrivateRoute>
                      <CalculatorPage
                        toggleModal={toggleModal}
                        showModal={showModal}
                      />
                    </PrivateRoute>
                  }
                />
                <Route
                  path={'/registration'}
                  element={
                    <PublicRoute>
                      <RegisterView />
                    </PublicRoute>
                  }
                />
                <Route
                  path={'/login'}
                  element={
                    <PublicRoute>
                      <LoginView />
                    </PublicRoute>
                  }
                />
                <Route
                  path="*"
                  element={
                    <MainPage toggleModal={toggleModal} showModal={showModal} />
                  }
                />
              </Route>
            </Routes>
          </Suspense>
        </>
      )}

      <ToastContainer autoClose={3000} />
    </div>
  );
};
