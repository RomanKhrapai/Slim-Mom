import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import s from './Loader.module.scss';


const Loader = () => {
  const [{isDark}] = useContext(ThemeContext);
  console.log(isDark)
return (<div className={isDark ? s.loader_dark : s.loader}>
  <span>S</span>
  <span>l</span>
  <span>i</span>
  <span>m</span>
  <span>M</span>
  <span>o</span>
  <span>m</span>
  
 <div className={isDark ? s.covers_dark : s.covers}>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>)
};

export default Loader;