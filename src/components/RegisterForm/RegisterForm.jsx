import React from "react";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import s from './RegisterForm.module.scss';

export default function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {t} = useTranslation();

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

      const handleBlur = e => {
        if (e.currentTarget === e.target) {
          if (name.length < 3 || name.length > 254) {
            return toast.info('Your name must contain 3-254 symbols');
          } if (password.length < 8) {
            return toast.info('Password must contain 8-254 symbols');
          }
        }
      }

      const handleSubmit = e => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !password.trim()) {
          return toast.error('Please, fill all fields in the form');
        } 
        setName('');
        setEmail('');
        setPassword('');
      };

      return (
        <form className={s.registration_form} onSubmit={handleSubmit}>
          <label className={s.registration_label}>
            <span>{t('authentification.Name')}</span>
            <input
              className={s.registration_input}
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t('authentification.Your name')}
              aria-label="Input for your name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="The name can only contain letters, an apostrophe, a dash, and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan, etc."
            />
          </label>
          <label className={s.registration_label}>
            <span>{t('authentification.Email')}</span>
            <input
              className={s.registration_input}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder={t('authentification.Your email')}
              aria-label="Input for your email"
            
            />
          </label>
          <label className={s.registration_label}>
            <span>{t('authentification.Password')}</span>
            <input
              className={s.registration_input}
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={t('authentification.Password must contain 8-254 symbols')}
              aria-label="Input for your password"
              
            />
          </label>
          <button className={s.registration_button} type="submit">{t('navigation.Registration')}</button>
        </form>
      );
    }


    /*if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error('Please, fill all fields in the form');
    } else if (name.length < 3 & name.length > 254) {
      return toast.info('Your name must contain 3-254 symbols');
    } else if (password.length < 8) {
      return toast.info('Password must contain 8-254 symbols');
    }*/