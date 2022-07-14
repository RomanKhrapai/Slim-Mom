import React from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useTranslation } from 'react-i18next';
import s from './RegisterPage.module.scss';
import Container from 'components/Container/Container';

export default function RegisterView() {

  const { t } = useTranslation();

    return (
      <div className={s.images_container}>
        <Container className={s.container_reg}>
        <div className={s.maincontent}>
        <div className={s.registration_title}>{t('navigation.Registration')}</div>
        <RegisterForm />
      </div>
      </Container> 
      </div>
    );
  }
