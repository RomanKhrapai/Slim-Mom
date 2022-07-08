import React from 'react';
import RegisterForm from "components/RegisterForm/RegisterForm";
import './RegisterPage.css';

export default function RegisterView() {
    return (
      <>
        <div className="registration_title">РЕЄСТРАЦІЯ</div>
        <RegisterForm />
      </>
    );
  }