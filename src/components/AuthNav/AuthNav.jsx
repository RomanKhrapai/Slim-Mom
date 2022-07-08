import React from 'react';
import { NavLink } from 'react-router-dom';
import './AuthNav.css';

export default function AuthNav() {
  return (
    <ul className='authnav'>
      <li className='authnav_item'>
        <NavLink to="/login" exact activeClassName="active" className='authnav_link'>
          УВІЙТИ
        </NavLink>
      </li>
      <li>
        <NavLink to="/register" exact activeClassName="active" className='authnav_link' >
          РЕЄСТРАЦІЯ
        </NavLink>
      </li>
    </ul>
  );
}