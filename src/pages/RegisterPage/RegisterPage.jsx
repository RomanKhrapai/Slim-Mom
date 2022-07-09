import React from 'react';
import RegisterForm from "components/RegisterForm/RegisterForm";
import s from './RegisterPage.module.scss';

export default function RegisterView() {
    return (
        <div className={s.maincontent}>
        <div className={s.registration_title}>РЕЄСТРАЦІЯ</div>
        <RegisterForm />
      </div>
    );
  }