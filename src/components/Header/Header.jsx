import React, { useState, useEffect } from 'react';
import styles from './header.module.scss';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header>
      <Navigation />
    </header>
  );
};

export default Header;
