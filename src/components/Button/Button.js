import React from 'react';
import s from '../Button/Button.module.scss';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Button({ children, className, ...attrs }) {
  const classes = classNames(s.modal__button, className);
  return (
    <button {...attrs} className={classes}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
