import React from 'react';
import { useState } from 'react';
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

  const handleSubmit = e => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      return toast.error('Будь ласка, заповність всі поля');
    }
    setEmail('');
    setPassword('');
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.login_label}>
        <span>Імейл*</span>
        <input
          className= {s.login_input}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Ваш імейл"
          aria-label="Input for your email"
          required
        />
      </label>
      <label className={s.login_label}>
        <span>Пароль*</span>
        <input
          className={s.login_input}
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Ваш пароль"
          aria-label="Input for your password"
          required
        />
      </label>
      <button className={s.login_button} type="submit">Увійти</button>
    </form>
  );
}