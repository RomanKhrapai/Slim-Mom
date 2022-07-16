import { React, lazy, Suspense, useState, useContext, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import i18n from './services/i18n/config';
import { useTranslation } from 'react-i18next';
import Header from 'components/Header';
import s from 'App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import authOperations from 'redux/auth/auth-operations';
import Loader from 'components/Loader';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import { BsSun, BsMoon } from 'react-icons/bs';

const LoginView = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));

export const App = () => {

  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);
  const [icon, setIcon] = useState(<BsSun size={40} />);

  const isAuthorised = useSelector(state => state.auth.isAuthorised);

  useEffect(() => {
    if (isDark) {
      setIcon(<BsMoon size={40} />);
    } else {
      setIcon(<BsSun size={40} />);
    }
  }, [isDark]);

  const { t } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(state => state.auth.isFetchingCurrentUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (

    <div
      className={showModal ? s.overflow_hidden : undefined}
      style={{ backgroundColor: theme.backgroundColor, color: theme.color, position: 'relative', minHeight:'100vh' }}
    >
      {/* <div className={showModal ? s.overflow_hidden : undefined}>  */}
      {isFetchingCurrentUser ? (
        <h1>Loading....</h1>
      ) : (
      <BrowserRouter>
        <Header />

        <div className={s.button_theme_swither} onClick={toggleTheme}>
          {icon}
        </div>
        <Suspense fallback={<Loader />}>
          {isAuthorised ? (
            <Routes>
              <Route
                path={'/'}
                element={
                  <MainPage toggleModal={toggleModal} showModal={showModal} />
                }
              />
              <Route path={'/diary'} element={<DiaryPage />} />
              <Route path={'/calculator'} element={<CalculatorPage />} />
              <Route
                path={'*'}
                replace={true}
                element={<Navigate to={'/'} />}
              />
            </Routes>
          ) : (
            <Routes>
              <Route
                path={'/'}
                element={
                  <MainPage toggleModal={toggleModal} showModal={showModal} />
                }
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
      </BrowserRouter>
      )}      
      <ToastContainer autoClose={3000} />
    </div>
  );
};
