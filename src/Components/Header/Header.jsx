import React, {useState, useEffect} from "react"
import styles from './header.module.scss';
import logo from '../../images/logo.svg'
const Header = () => {



    return (
        <header>
          <img src={logo} alt={'logo'}/>
          <div className={styles.vector1}/>
          <a>Sign In</a>
          <a>Registration</a>
        </header>
    )
}

export default Header;
