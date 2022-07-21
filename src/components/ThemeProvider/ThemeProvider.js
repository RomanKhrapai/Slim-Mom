import {React, createContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import authSelectors from 'redux/auth/auth-selectors';
export const ThemeContext = createContext();

const themes = {
  dark: {
    backgroundColor: ' rgb(56, 55, 84)',
    color: 'white',
    stroke: ' rgb(255, 255, 255)',
    fill: 'rgb(255, 255, 255)',
  },
  light: {
    backgroundColor: 'white',
  },
};

export const ThemeProvider = ({ children }) => {
  const isDark = useSelector(state => state.theme.isDark);
  const isAuthorised = useSelector(authSelectors.getIsAuthorised);
  let theme = isDark ? themes.dark : themes.light;

  if (!isAuthorised || !isDark) {
    theme = themes.light;
  }
  else{
    theme = themes.dark
  }

  return (
    <ThemeContext.Provider value={[{ theme }]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
