import React from 'react';
import s from './PageTitle.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useContext } from 'react';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';

export default function PageTitle({ children, className, ...attrs }) {
  const [{isDark}] = useContext(ThemeContext)
  const classes = classNames(s.pageTitle, className);
  return (
    <h1 {...attrs} className={isDark ? s.white_title : s.pageTitle}>
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
