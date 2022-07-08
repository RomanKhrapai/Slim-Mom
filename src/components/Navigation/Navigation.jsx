import React from 'react';
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <nav>
      <ul className='navigation'>
        <li className='navigation_item'>
          <NavLink to="/" activeClassName="active" exact className="navigation_link">
            Home
          </NavLink>
        </li>
        {isLoggedIn && (
          <li>
              CALCULATORS
          </li>
        )}
      </ul>
    </nav>
  );
}