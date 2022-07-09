import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './AuthNav.module.scss';

const getNavLinkClassName = ({isActive}) => isActive ? s.authnav_link_active : s.authnav_link

export default function AuthNav() {
  return (
    <ul className={s.authnav}>
      <li className={s.authnav_item}>
        <NavLink to="/login" className={getNavLinkClassName}>
          УВІЙТИ
        </NavLink>
      </li>
      <li className={s.authnav_item}>
        <NavLink to="/register" className={getNavLinkClassName}>
          РЕЄСТРАЦІЯ
        </NavLink>
      </li>
    </ul>
  );
}