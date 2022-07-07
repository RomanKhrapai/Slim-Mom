import React from 'react';
import Header from "./Components/Header";
import styles from 'App.module.scss';

export const App = () => {
  return (
    <div
      className={styles.App}
    >
      <Header/>
      React homework template
    </div>
  );
};
