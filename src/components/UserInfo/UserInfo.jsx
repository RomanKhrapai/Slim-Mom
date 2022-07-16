import React, {useState, useEffect} from "react"
import { useTranslation } from 'react-i18next';
import styles from './userinfo.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import authOperations from 'redux/auth/auth-operations.js';

const UserInfo = () => {

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const tryLogOut = async () => {
    dispatch(authOperations.logOut());
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
