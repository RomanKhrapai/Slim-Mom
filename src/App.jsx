import { React, lazy, Suspense, useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { Outlet, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import i18n from './services/i18n/config';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import s from 'App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/options/options-operations';
import Loader from 'components/Loader';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import { BsSun, BsMoon } from 'react-icons/bs';
import authSelectors from 'redux/options/options-selectors';
import { PrivateRoute, PublicRoute } from 'components/Routers';

const LoginView = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));

export const App = () => {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [icon, setIcon] = useState(<BsSun size={40} />);
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurent);
  const isAuthorised = useSelector(authSelectors.getIsAuthorised);

  const { t } = useTranslation();
  const changeLanguage = lng => i18n.changeLanguage(lng);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDark) {
      setIcon(<BsMoon size={40} />);
    } else {
      setIcon(<BsSun size={40} />);
    }
  }, [isDark]);

  useEffect(() => {
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
          {/* <div className={s.button_theme_swither} onClick={toggleTheme}>
            {icon}
          </div> */}
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
                      <CalculatorPage toggleModal={toggleModal} showModal={showModal} />
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
