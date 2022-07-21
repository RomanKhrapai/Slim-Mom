import React, { useState, useEffect } from 'react';
import Navigation from '../Navigation';
import styles from './header.module.scss';

const Header = () => {
  return (
    <header>
      <Navigation />
    </header>
  );
};

export default Header;
