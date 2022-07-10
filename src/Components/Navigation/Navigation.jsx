import React, { useState, useEffect } from 'react';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
import largeLogo from '../../images/logo.svg';
import mediumLogo from '../../images/logo1-tablet.svg';
import smallLogo from '../../images/logo1-mobile.svg';
import menuSvg from '../../images/burger-menu1.svg'
import closeSvg from '../../images/close-button1.svg'
import UserInfo from '../UserInfo';
import {
  screenTypes,
  useGetTypeOfScreen,
} from '../../hooks/useGetTypeOfScreen';

const Navigation = () => {
  const isLoggedIn = true;

  const getNavLinkClassName = ({ isActive }) =>
    isActive
      ? `${styles.nav__link_active} ${styles.nav__link}`
      : styles.nav__link;
  const getLoggedInLinkClassName = ({ isActive }) =>
    isActive
      ? `${styles.nav__link__loggedIn_active} ${styles.nav__link__loggedIn}`
      : styles.nav__link__loggedIn;
  const getLogoClassName = ({ isActive }) =>
    isActive ? styles.active__logo : styles.logo;

  const screen = useGetTypeOfScreen();
  const getLogo = () => {
    if (screen === screenTypes.smallType) {
      if (isLoggedIn) {
        return mediumLogo;
      }
      return smallLogo;
    } else if (screen === screenTypes.mediumType) {
      return mediumLogo;
    } else {
      return largeLogo;
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      <NavLink
        onClick={() => setIsMenuOpen(false)}
        className={getLogoClassName}
        to={'/'}
      >
        <img src={getLogo()} alt={'logo'} />
        <div className={styles.vector1} />
      </NavLink>
      {isLoggedIn ? (
        <>
          <div className={isMenuOpen ? styles.menu : styles.menu__isClosed}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={getLoggedInLinkClassName}
              to={'/diary'}
            >
              Diary
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={getLoggedInLinkClassName}
              to={'/calculator'}
            >
              Calculator
            </NavLink>
          </div>
          <UserInfo />
          <button
            className={styles.menu__button}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img className={isMenuOpen ? styles.menu__button__isOpen : styles.menu__button__isClosed} src={isMenuOpen ? closeSvg : menuSvg} alt={'menu'}/>
          </button>
        </>
      ) : (
        <>
          <NavLink className={getNavLinkClassName} to={'/login'}>
            Sign In
          </NavLink>
          <NavLink className={getNavLinkClassName} to={'/registration'}>
            Registration
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
