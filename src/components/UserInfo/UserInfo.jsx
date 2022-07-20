import React, {useState, useEffect} from "react"
import { useTranslation } from 'react-i18next';
import styles from './userinfo.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations.js';
import { useContext } from 'react';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import EllipsisText from "react-ellipsis-text";

  const UserInfo = () => {
  const [{isDark}] = useContext(ThemeContext)

  const { user } = useSelector(state => state.auth)

  const dispatch = useDispatch()
  const { t } = useTranslation();

  const tryLogOut = async () => {
    dispatch(authOperations.logOut());
  };

  return (
      <div className={styles.userinfo}>
      <h3 className={user.name !== "" ? styles.light : undefined}>{user.name === '' ? 'Name' : <EllipsisText text={user.name} length={6} tailClassName={ styles.myTail } />}</h3>
        <div className={styles.vector1} />
        <button className={isDark ? styles.button_dark : undefined} onClick={() => tryLogOut()}>{t("navigation.Sign Out")}</button>
      </div>
  )
}

export default UserInfo;
