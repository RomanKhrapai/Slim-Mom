import { Formik } from 'formik';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import authOperations from 'redux/auth/auth-operations.js';
import Loader from '../Loader';
import s from './RegisterForm.module.scss';

const getActiveClass = condition => {
  if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
  return `${s.label} ${s.labelAbsolute}`;
};


const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.isLoading); 
  
  return (
  <>
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      validate={values => {
        const errors = {};
        if (!values.name) {
          errors.name = t('authentification.This fied is required');
        } else if (
          values.name.length < 3) {
          errors.name = t('authentification.This field must contain more than 3 symbols');
        } else if (
          !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(values.name)) {
          errors.name = t('authentification.This field must contain only letters');
        } 
        
        if (!values.email) {
          errors.email = t('authentification.This fied is required');
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = t('authentification.Invalid email address');
        }

        if (!values.password) {
          errors.password = t('authentification.This fied is required');
        } else if (
          values.password.length < 8) {
          errors.password = t("authentification.This field must contain more than 8 symbols");
        }
        return errors;
      }}
      onSubmit={({name, email, password}, { resetForm }) => {
        dispatch(authOperations.signUpUser({name, email, password}))
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
            type="name"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={s.input}
          />
          {errors.name && touched.name && (
                  <div className={s.errorMessage}>{errors.name}</div>
                )}
          <label className={getActiveClass(values.name)} htmlFor="name">{t('authentification.Name')}</label>
          </div>
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
          <div className={s.inputBox_last}>
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
          <button className={s.registration_button} type="submit">
          {t('navigation.Registration')}
          </button>
          </div>
        </form>
         )
        }
      </Formik>
      { loading && <Loader /> }
    </>
  );
};

export default RegisterForm;