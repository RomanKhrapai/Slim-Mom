import React from 'react';
import LoginForm from "../../components/LoginForm/LoginForm";
import { useTranslation } from 'react-i18next';
import s from'./LoginPage.module.scss';

export default function LoginView() {

  const { t } = useTranslation();

    return (
      <div   style={{marginTop: '200px'}} className={s.maincontent}>
      <div className={s.loginpage_title}>{t('navigation.Sign In')}</div>
        <LoginForm />
      </div>
    );
  }

