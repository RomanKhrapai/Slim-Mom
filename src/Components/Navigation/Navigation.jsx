import React, {useState, useEffect} from "react"
import styles from './navigation.module.scss';
import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";

const Navigation = () => {

    const isLoggedIn = true

    const getNavLinkClassName = ({isActive}) => isActive ? styles.nav__link_active : styles.nav__link

    return (<nav>
      <NavLink to={'/'}>
        <img src={logo} alt={'logo'}/>
      </NavLink>
      <div className={styles.vector1}/>
      {isLoggedIn ?
        <><NavLink className={getNavLinkClassName} to={'/diary'}>
          Diary
        </NavLink>
        <NavLink className={getNavLinkClassName} to={'/calculator'}>
          Calculator
        </NavLink></>
      :
        <><NavLink className={getNavLinkClassName} to={'/login'}>
        Sign In
        </NavLink>
        <NavLink className={getNavLinkClassName} to={'/registration'}>
        Registration
        </NavLink></>
      }
    </nav>)



}

export default Navigation