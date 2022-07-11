import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {toast} from 'react-toastify';
import s from'./LoginForm.module.scss';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'email':
        return setEmail(value);
      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const { t } = useTranslation();

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.error('Please, fill all fields in the form');
    }
    setEmail('');
    setPassword('');
  };


  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.login_label}>
        <span> {t('authentification.Email')}</span>
        <input
          className= {s.login_input}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder={t('authentification.Your email')}
          aria-label="Input for your email"
          
        />
      </label>
      <label className={s.login_label}>
        <span>{t('authentification.Password')}</span>
        <input
          className={s.login_input}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder={t('authentification.Your password')}
          aria-label="Input for your password"
          
        />
      </label>
      <button className={s.login_button} type="submit">{t('navigation.Sign In')}</button>
    </form>
  );
}