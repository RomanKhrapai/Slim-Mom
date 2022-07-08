import React from 'react';
import LoginForm from "components/LoginForm/LoginForm";
import './LoginPage.css';

export default function LoginView() {
    return (
      <>
        <div className="loginpage_title">ЛОГІНІЗАЦІЯ</div>
        <LoginForm />
      </>
    );
  }