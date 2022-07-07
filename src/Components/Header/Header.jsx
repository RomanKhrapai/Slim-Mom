import React, {useState, useEffect} from "react"
import styles from './header.module.scss';
import logo from '../../images/logo.svg'
import Navigation from "../Navigation";
const Header = () => {



    return (
        <header>
         <Navigation />
        </header>
    )
}

export default Header;
