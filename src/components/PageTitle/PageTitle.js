import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import s from './PageTitle.module.scss';

export default function PageTitle({ children, className, ...attrs }) {
  const isDark = useSelector((state) => state.theme.isDark);
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
