import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import authOperations from 'redux/auth/auth-operations.js';
import { confirmWindow } from 'components/ConfirmBox/ConfirmWindow';
import EllipsisText from 'react-ellipsis-text';

import styles from './userinfo.module.scss';

const UserInfo = () => {
  const isDark = useSelector(state => state.theme.isDark);

  const { user } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const tryLogOut = async () => {
     const message = t('navigation.Are you sure you want to log out of your account?');
    confirmWindow(message,t("Yes"), t("No"), ()=>{ dispatch(authOperations.logOut())})
   
  };

  return (
    <div className={styles.userinfo}>
      <h3 className={user.name !== '' ? styles.light : styles.dark}>
        {user.name === '' ? (
          'Name'
        ) : (
          <EllipsisText
            text={user.name}
            length={10}
            tailClassName={styles.myTail}
          />
        )}
      </h3>
      <div className={styles.vector1} />
      <button
        className={isDark ? styles.button_dark : undefined}
        onClick={() =>  tryLogOut()}
      >
        {t('navigation.Sign Out')}
      </button>
    </div>
  );
};

export default UserInfo;
