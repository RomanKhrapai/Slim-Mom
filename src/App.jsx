import React from 'react';
import Header from "./Components/Header";
import styles from 'App.module.scss';
import {BrowserRouter} from "react-router-dom";
import {Navigate, Route, Routes} from "react-router";

export const App = () => {

  const isLoggedIn = true


  if (isLoggedIn) {
    return (
      <div
        className={styles.App}
      >
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path={'/'} element={<h1>Main Private Component</h1>} />
            <Route path={'/diary'} element={<h1>Diary Private Component</h1>} />
            <Route path={'/calculator'} element={<h1>Calculator Private Component</h1>} />

            <Route path={'*'} replace={true} element={<Navigate to={'/'}/>}/>
          </Routes>
        </BrowserRouter>

        React homework template
      </div>
    );
  } else {
    return (
      <div
        className={styles.App}
      >
        <BrowserRouter basename={'Slim-Mom'}>
          <Header/>
          <Routes>
            <Route path={'/'} element={<h1>Main Public Component</h1>} />
            <Route path={'/registration'} element={<h1>Registration Component</h1>}/>
            <Route path={'/login'} element={<h1>Login Component</h1>}/>
            <Route path={'*'} replace={true} element={<Navigate to={'/register'}/>}/>
          </Routes>
        </BrowserRouter>

        React homework template
      </div>
    );
  }

};
