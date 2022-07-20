import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { LanguageButton } from 'components/LanguageButton/LanguageButton';
import largeLogo from '../../images/logo.svg';
import mediumLogo from '../../images/logo1-tablet.svg';
import smallLogo from '../../images/logo1-mobile.svg';
import menuSvg from '../../images/burger-menu1.svg';
import closeSvg from '../../images/close-button1.svg';
import UserInfo from '../UserInfo';
import i18n from 'services/i18n/config';
import {
  screenTypes,
  useGetTypeOfScreen,
} from '../../hooks/useGetTypeOfScreen';
import { useSelector } from 'react-redux';
import ThemeButton from 'components/ThemeProvider/ThemeButton';

import authSelectors from 'redux/auth/auth-selectors';
import { ReactComponent as LogoNew } from '../../images/logo-new.svg';
import { ReactComponent as Slim } from '../../images/slim.svg';
import { ReactComponent as Mom } from '../../images/mom.svg';
import { ReactComponent as Cross } from '../../images/white-cross.svg';
import { ReactComponent as Burger } from '../../images/white-burger.svg';

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
