import React from 'react';
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { useTranslation } from 'react-i18next';
import s from './RegisterPage.module.scss';

export default function RegisterView() {

  const { t } = useTranslation();

    return (
        <div   style={{marginTop: '200px'}} className={s.maincontent}>
        <div className={s.registration_title}>{t('navigation.Registration')}</div>
        <RegisterForm />
      </div>
    );
  }
