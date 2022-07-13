import React from 'react';
import s from './PageTitle.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function PageTitle({ children, className, ...attrs }) {
  const classes = classNames(s.pageTitle, className);
  return (
    <h1 {...attrs} className={classes}>
      {children}
    </h1>
  );
}

PageTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
