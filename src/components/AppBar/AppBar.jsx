import React from 'react';
import { useSelector } from "react-redux";
import { authSelectors } from "redux/auth";
import AuthNav from "components/AuthNav/AuthNav";
import UserMenu from "components/UserMenu/UserMenu";
import Navigation from "components/Navigation/Navigation";

import './AppBar.css';


export default function AppBar() {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
    return (
      <header className= 'header'>
        <Navigation />
        {isLoggedIn ? <UserMenu /> : <AuthNav />}
      </header>
    );
  }