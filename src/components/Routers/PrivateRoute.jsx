import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import PropTypes from 'prop-types';

function PrivateRoute({ children }) {
  const isLoggedIn = useSelector(authSelectors.getIsAuthorised);

  return isLoggedIn ? children : <Navigate to="/registration" replace={true} />;
}
PrivateRoute.propTypes = {
  children: PropTypes.element,
};
export default PrivateRoute;
