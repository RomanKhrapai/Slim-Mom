import React, {useState, useEffect} from "react";
import { useTranslation } from 'react-i18next';
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
import { useSelector } from 'react-redux';

const Navigation = () => {

  const { isAuthorised } = useSelector(state => state.auth);
  
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

  const { t } = useTranslation();
  const screen = useGetTypeOfScreen()
  const getLogo = () => {
    if (screen === screenTypes.smallType) {
      if (isAuthorised) {
        return mediumLogo
      }
      return smallLogo;
    } else if (screen === screenTypes.mediumType) {
      return mediumLogo;
    } else {
      return largeLogo;
    }
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem('token');


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
      {isAuthorised && token !== null ? (
        <>
          <div className={isMenuOpen ? styles.menu : styles.menu__isClosed}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={getLoggedInLinkClassName}
              to={'/diary'}
            >
              {t('navigation.Diary')}
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={getLoggedInLinkClassName}
              to={'/calculator'}
            >
              {t("navigation.Calculator")}
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
            {t("navigation.Sign In")}
          </NavLink>
          <NavLink className={getNavLinkClassName} to={'/registration'}>
            {t("navigation.Registration")}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Navigation;
