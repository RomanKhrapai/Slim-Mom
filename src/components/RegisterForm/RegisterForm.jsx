import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import s from './RegisterForm.module.scss';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
          case 'name':
            return setName(value);
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
        if (!name.trim() || !email.trim() || !password.trim()) {
          return toast.error('Будь ласка, заповніть всі поля');
        } else if (password.length < 7) {
          return toast.info(
            'Пароль має містити не менш ніж 7 символів',
          );
        }
        setName('');
        setEmail('');
        setPassword('');
      };

      return (
        <form className={s.registration_form} onSubmit={handleSubmit}>
          <label className={s.registration_label}>
            <span>Нікнейм*</span>
            <input
              className={s.registration_input}
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Ваше нікнейм"
              aria-label="Input for your name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="The name can only contain letters, an apostrophe, a dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
              required
            />
          </label>
          <label className={s.registration_label}>
            <span>Імейл*</span>
            <input
              className={s.registration_input}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Ваш імейл"
              aria-label="Input for your email"
              required
            />
          </label>
          <label className={s.registration_label}>
            <span>Пароль*</span>
            <input
              className={s.registration_input}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Пароль має містити не менш 7 символів"
              aria-label="Input for your password"
              required
            />
          </label>
          <button className={s.registration_button} type="submit">Зареєструватися</button>
        </form>
      );
    }