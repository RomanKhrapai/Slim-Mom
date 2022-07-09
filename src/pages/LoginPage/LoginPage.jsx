import React from 'react';
import LoginForm from "components/LoginForm/LoginForm";
import s from'./LoginPage.module.scss';

export default function LoginView() {
    return (
      <div className={s.maincontent}>
      <div className={s.loginpage_title}>ЛОГІНІЗАЦІЯ</div>
        <LoginForm />
      </div>
    );
  }

  