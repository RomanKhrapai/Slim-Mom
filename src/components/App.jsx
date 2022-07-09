import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ToastContainer } from "react-toastify";
import AuthNav from './AuthNav/AuthNav';

import s from'./App.module.scss';

const LoginView = lazy(()=> import('pages/LoginPage/LoginPage'));
const RegisterView = lazy(()=> import('pages/RegisterPage/RegisterPage'));
const HomeView = lazy(()=> import('pages/MainPage/MainPage'));


export default function App() {
  return (
    <div className={s.container}>
        <>
        <AuthNav/>
          <Suspense fallback={<h1>Loading....</h1>}>
          <Routes>
              <Route path="/" element={<HomeView />} />
              <Route
                path="/register"
                restricted
                element={
                  <RegisterView />                 }
              />
              <Route
                path="/login"
                restricted
                element={<LoginView />
                }
              />
            </Routes>
          </Suspense>
        </>
      
      <ToastContainer autoClose={3000} />
    </div>
  );
}
