import { Formik } from 'formik';
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import s from './LoginForm.module.scss';

const getActiveClass = condition => {
  if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
  return `${s.label} ${s.labelAbsolute}`;
};


const LoginForm = () => {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  
  return (
  <>
    <Formik
      initialValues={{email: '', password: ''}}
      validate={values => {
        const errors = {};
               
        if (!values.email) {
          errors.email = t('authentification.This fied is required');
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = t('authentification.Invalid email address');
        }

        if (!values.password) {
          errors.password = t('authentification.This fied is required');
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
        setFormData(values);
        resetForm();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    
      }) => (
        <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.inputsContainer}>
            <div className={s.inputBox}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={s.input}
          />
          {errors.email && touched.email && (
                  <div className={s.errorMessage}>{errors.email}</div>
                )}
          <label className={getActiveClass(values.email)} htmlFor="email">{t('authentification.Email')}</label>
          </div>
          <div className={s.inputBox}>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            className={s.input}
          />
            {errors.password && touched.password && (
                  <div className={s.errorMessage}>{errors.password}</div>
                )}
          <label className={getActiveClass(values.password)} htmlFor="password">{t('authentification.Password')}</label>
          </div>
          <button className={s.login_button} type="submit">
          {t('navigation.Sign In')}
          </button>
          </div>
        </form>
         )
        }
      </Formik>
    </>
  );
};

export default LoginForm;




/*
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
}*/