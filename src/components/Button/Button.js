import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import s from '../Button/Button.module.scss';

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
