import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';
import s from './Loader.module.scss';


const Loader = () => {
  const isDark = useSelector((state) => state.theme.isDark);
  const isAuthorised = useSelector(authSelectors.getIsAuthorised);

return (<div className={(isAuthorised && isDark) ? s.loader_dark : s.loader}>
  <span>S</span>
  <span>l</span>
  <span>i</span>
  <span>m</span>
  <span>M</span>
  <span>o</span>
  <span>m</span>
  
 <div className={(isAuthorised && isDark) ? s.covers_dark : s.covers}>
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