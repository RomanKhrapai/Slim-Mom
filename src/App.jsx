import { React, lazy, Suspense, useState, useContext, useEffect} from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import i18n from './services/i18n/config';
import { useTranslation } from 'react-i18next';
import CalculatorPage from 'pages/CalculatorPage';
import Header from 'components/Header';
import s from 'App.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'components/Loader';
// import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
// import { BsSun,BsMoon } from 'react-icons/bs';


const LoginView = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegisterView = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage/DiaryPage'));

export const App = () => {
  const isLoggedIn = true;
//   const [{theme, isDark}, toggleTheme] = useContext(ThemeContext)
//   const [icon, setIcon] = useState(<BsSun size={40}/>)

// useEffect(()=>{
//   if(isDark){
//     setIcon(<BsMoon size={40}/>)
//   }
//   else{setIcon(<BsSun size={40}/>)}
// },[isDark])

  const { t } = useTranslation();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    // <div className={showModal ? s.overflow_hidden : undefined} style={{backgroundColor: theme.backgroundColor, color: theme.color}}>
        <div className={showModal ? s.overflow_hidden : undefined}> 
      <BrowserRouter basename={'Slim-Mom'}>
        <Provider store={store}>
            <Header />
            {/* <div onClick={toggleTheme}>{icon}</div> */}
              <Suspense fallback={<div>LOADER</div>}>
                {isLoggedIn ? (
                  <Routes>
                    <Route path={'/'} element={<MainPage toggleModal={toggleModal} showModal={showModal}/>} />
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
                        <h1 style={{ marginTop: '200px' }}>
                          {t('Calculate your daily calorie intake')}
                        </h1>
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

        </Provider>
      </BrowserRouter>

      <ToastContainer autoClose={3000} />
    </div>
  );
};
