import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default function Container({ children, className }) {
  const classes = classNames(className);
  return <div className={classes}>{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
