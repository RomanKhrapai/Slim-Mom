import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'services/i18n/config';
import authSelectors from 'redux/auth/auth-selectors';
import { LanguageButton } from 'components/LanguageButton/LanguageButton';
import ThemeButton from 'components/ThemeProvider/ThemeButton';
import UserInfo from '../UserInfo';

import {
  screenTypes,
  useGetTypeOfScreen,
} from '../../hooks/useGetTypeOfScreen';
import { ReactComponent as LogoNew } from '../../assets/images/logo-new.svg';
import { ReactComponent as Slim } from '../../assets/images/slim.svg';
import { ReactComponent as Mom } from '../../assets/images/mom.svg';
import { ReactComponent as Cross } from '../../assets/images/white-cross.svg';
import { ReactComponent as Burger } from '../../assets/images/white-burger.svg';
import largeLogo from '../../assets/images/logo.svg';
import mediumLogo from '../../assets/images/logo1-tablet.svg';
import smallLogo from '../../assets/images/logo1-mobile.svg';
import menuSvg from '../../assets/images/burger-menu1.svg';
import closeSvg from '../../assets/images/close-button1.svg';

import styles from './navigation.module.scss';

const Navigation = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const isAuthorised = useSelector(authSelectors.getIsAuthorised);
     
    const getNavLinkClassName = ({ isActive }) =>
    isActive
    ? `${styles.nav__link_active} ${styles.nav__link}`
    : styles.nav__link;

  const getNavLinkClassNameDark = ({ isActive }) =>
    isActive
      ? `${styles.nav__link_active_dark} ${styles.nav__link_dark}`
      : styles.nav__link_dark;

  const getLoggedInLinkClassName = ({ isActive }) =>
    isActive
      ? `${styles.nav__link__loggedIn_active} ${styles.nav__link__loggedIn}`
      : styles.nav__link__loggedIn;
      
  const getLoggedInLinkClassNameDark = ({ isActive }) =>
    isActive
      ? `${styles.nav__link__loggedIn_active_dark} ${styles.nav__link__loggedIn_dark}`
      : styles.nav__link__loggedIn_dark;

  const getLogoClassName = ({ isActive }) =>
    isActive ? styles.active__logo : styles.logo;

  const { t } = useTranslation();
  const screen = useGetTypeOfScreen();
  const getLogo = () => {
    if (screen === screenTypes.smallType) {
      if (isAuthorised) {
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
  
  const token = localStorage.getItem('token');
  
  return (
    <nav>
      <NavLink
        onClick={() => setIsMenuOpen(false)}
        className={getLogoClassName}
        to={'/'}
      >
        {isDark ? (
          <div
            className={
              !isAuthorised
                ? styles.logo_wrapper_unauthorised
                : styles.logo_wrapper
            }
          >
            <LogoNew className={isAuthorised ? styles.logo_new : styles.logo_new_unauthorised} />
            <div
              className={
                !isAuthorised
                  ? styles.words_wrapper_unauthorised
                  : styles.words_wrapper
              }
            >
              <Slim className={ isAuthorised ? styles.slim : styles.slim_unauthorised } />
              <Mom className={styles.mom} />
            </div>
          </div>
        ) : (
          <img src={getLogo()} alt={'logo'} />
        )}
        <div className={isDark ? styles.vector1_dark : styles.vector1} />
      </NavLink>
      {isAuthorised ? (
        <>
          <div className={isMenuOpen ? styles.menu : styles.menu__isClosed}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={
                isDark ? getLoggedInLinkClassNameDark : getLoggedInLinkClassName
              }
              to={'/diary'}
            >
              {t('navigation.Diary')}
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={
                isDark ? getLoggedInLinkClassNameDark : getLoggedInLinkClassName
              }
              to={'/calculator'}
            >
              {t('navigation.Calculator')}
            </NavLink>
          </div>
          <UserInfo />

<ThemeButton/>

          <LanguageButton />

          <button
            className={styles.menu__button}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isDark ? (
              isMenuOpen ? (
                <Cross className={styles.icons_dark} />
              ) : (
                <Burger className={styles.icons_dark} />
              )
            ) : (
              <img
                className={
                  isMenuOpen
                    ? styles.menu__button__isOpen
                    : styles.menu__button__isClosed
                }
                src={isMenuOpen ? closeSvg : menuSvg}
                alt={'menu'}
              />
            )}
          </button>
        </>
      ) : (
        <>
          <NavLink
  
            className={(isAuthorised && isDark )? getNavLinkClassNameDark : getNavLinkClassName}
            to={'/login'}
          >
            {t('navigation.Sign In')}
          </NavLink>
          <NavLink
            className={(isAuthorised && isDark)? getNavLinkClassNameDark : getNavLinkClassName}
            to={'/registration'}
          >
            {t('navigation.Registration')}
          </NavLink>
          <LanguageButton />
        </>
      )}
    </nav>
  );
};

export default Navigation;
