import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './navigation.module.scss';
import { NavLink } from 'react-router-dom';
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
import { useContext } from 'react';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';


const Navigation = () => {
  const [{isDark}] = useContext(ThemeContext)
  const { isAuthorised } = useSelector(state => state.auth);

  // const languageClassToggle = (e) =>{
  //   const firstChildClass = e.currentTarget.firstChild.firstChild;
  //   const secondChildClass = e.currentTarget.firstChild.lastChild
  //   firstChildClass.className.includes(styles.currentLanguage)? firstChildClass.className = styles.secondaryLanguage:  firstChildClass.className = styles.currentLanguage;
  //   secondChildClass.className.includes(styles.currentLanguage)? secondChildClass.className = styles.secondaryLanguage:  secondChildClass.className = styles.currentLanguage
  // }

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

  const currentLanguage = i18n.language
  const secondaryLanguage = ( currentLanguage === "uk"? "en": "uk")
  
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
      {isAuthorised ? (
        <>
          <div className={isMenuOpen ? styles.menu : styles.menu__isClosed}>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={isDark? getLoggedInLinkClassNameDark :getLoggedInLinkClassName}
              to={'/diary'}
            >
              {t('navigation.Diary')}
            </NavLink>
            <NavLink
              onClick={() => setIsMenuOpen(false)}
              className={isDark? getLoggedInLinkClassNameDark :getLoggedInLinkClassName}
              to={'/calculator'}
            >
              {t('navigation.Calculator')}
            </NavLink>
          </div>
          <UserInfo />
          <button
            className={styles.menu__button}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img
              className={
                isMenuOpen
                  ? styles.menu__button__isOpen
                  : styles.menu__button__isClosed
              }
              src={isMenuOpen ? closeSvg : menuSvg}
              alt={'menu'}
            />
          </button>
        </>
      ) : (
        <>
          <NavLink className={isDark? getNavLinkClassNameDark : getNavLinkClassName} to={'/login'}>
            {t('navigation.Sign In')}
          </NavLink>
          <NavLink className={isDark? getNavLinkClassNameDark : getNavLinkClassName} to={'/registration'}>
            {t('navigation.Registration')}
          </NavLink>
        </>
      )}
<button className={styles.languageBtn}type='button' onClick={(e)=> {i18n.changeLanguage(secondaryLanguage); 
  // languageClassToggle(e)
  }}><span className={styles.languageText}><span className={isDark ? styles.currentLanguage_dark : styles.currentLanguage}>{currentLanguage==="uk"? "Ukr": "Eng"}</span>/ <span className={styles.secondaryLanguage}>{currentLanguage!=="uk"? "Ukr": "Eng"}</span></span></button>
    </nav>
  );
};

export default Navigation;
