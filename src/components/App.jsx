import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { authOperations, authSelectors } from "redux/auth";
import AppBar from "components/AppBar/AppBar";

import './App.css';

const LoginView = lazy(()=> import('pages/LoginPage/LoginPage'));
const RegisterView = lazy(()=> import('pages/RegisterPage/RegisterPage'));
const HomeView = lazy(()=> import('pages/HomePage/HomePage'));


export default function App() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className='container'>
      {isFetchingCurrentUser ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <AppBar />
          <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
              <Route path="/" element={<HomeView />} />
              <Route
                path="/register"
                restricted
                element={
                  !isLoggedIn ? <RegisterView /> : <Navigate to="/contacts" />
                }
              />
              <Route
                path="/login"
                redirectTo="/contacts"
                restricted
                element={
                  !isLoggedIn ? <LoginView /> : <Navigate to="/contacts" />
                }
              />
            </Routes>
          </Suspense>
        </>
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}



/*import React from 'react';

export const App = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
        backgroundColor : "blue"
      }}
    >
      React homework template
    </div>
  );
};
*/