import React, {useState, useEffect} from "react"
import { useTranslation } from 'react-i18next';
import styles from './userinfo.module.scss'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as logOut from '../../redux/auth/auth-operations';
//import {logOut} from '../../redux/auth/auth-operations'

const UserInfo = () => {

  const { user } = useSelector(state => state)
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const tryLogOut = async () => {
    dispatch(logOut());
  };

  return (
      <div className={styles.userinfo}>
        <h3>{user.name === '' ? 'Name' : user.name}</h3>
        <div className={styles.vector1} />
        <button onClick={() => tryLogOut()}>{t("navigation.Sign Out")}</button>
      </div>
  )
}

export default UserInfo;
