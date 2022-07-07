import React, {useState, useEffect} from "react"
import styles from './navigation.module.scss';
import logo from "../../images/logo.svg";
import {NavLink} from "react-router-dom";

const Navigation = () => {

    const isLoggedIn = true

    if (isLoggedIn) {
      return (
        <nav>
          <NavLink to={'/'}>
            <img src={logo} alt={'logo'}/>
          </NavLink>
          <div className={styles.vector1}/>
          <NavLink className={({isActive}) =>
            isActive ? styles.nav__link_active : styles.nav__link} to={'/diary'}>
            Diary
          </NavLink>
          <NavLink className={({isActive}) =>
            isActive ? styles.nav__link_active : styles.nav__link} to={'/calculator'}>
            Calculator
          </NavLink>
        </nav>
      )
    } else {
      return (
        <nav>
          <NavLink to={'/'}>
            <img src={logo} alt={'logo'}/>
          </NavLink>
          <div className={styles.vector1}/>
          <NavLink className={({isActive}) =>
            isActive ? styles.nav__link_active : styles.nav__link} to={'/login'}>
            Sign In
          </NavLink>
          <NavLink className={({isActive}) =>
            isActive ? styles.nav__link_active : styles.nav__link} to={'/registration'}>
            Registration
          </NavLink>
        </nav>
      )
    }

}

export default Navigation
