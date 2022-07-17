import { createContext, useEffect, useState } from 'react';
import React from 'react';
export const ThemeContext = createContext();
import PropTypes from 'prop-types';
import useLocalStorage from "use-local-storage";

const themes = {
  dark: {
    backgroundColor: ' rgb(56, 55, 84)',
    color: 'white',
    stroke: ' rgb(255, 255, 255)',
    fill:  'rgb(255, 255, 255)',
    
  },
  light: {
    backgroundColor: 'white',
    // color:"black"
  },
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useLocalStorage(false);
  const theme = isDark ? themes.dark : themes.light;

  const toggleTheme = () => {
    // localStorage.setItem('isDark', JSON.stringify(!isDark));
    setIsDark(!isDark);
  };

  useEffect(() => {
    // localStorage.getItem('isDark') === true ? setIsDark(!isDark) : setIsDark(isDark) 

  }, []);

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
