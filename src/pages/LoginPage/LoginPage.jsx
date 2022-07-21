import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from "../../components/LoginForm/LoginForm";
import Container from 'components/Container/Container';

import s from'./LoginPage.module.scss';


export default function LoginView() {

  const { t } = useTranslation();

    return (
      <div className={s.images_container}>
        <Container className={s.container_login}>
      <div className={s.maincontent}>
      <div className={s.loginpage_title}>{t('navigation.Sign In')}</div>
      <LoginForm />
  
      </div>
      </Container> 
      </div>

    );
  }
