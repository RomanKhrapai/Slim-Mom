import { Formik } from 'formik';
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import optionsOperations from 'redux/options/options-operations.js';
import Loader from '../Loader';
import s from './LoginForm.module.scss';

const getActiveClass = condition => {
  if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
  return `${s.label} ${s.labelAbsolute}`;
};


const LoginForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.options.isLoading);  
  
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
      onSubmit={({email, password}, { resetForm })=> {
        dispatch(optionsOperations.logIn({email, password}))
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
          <button className={s.login_button} type="submit">
          {t('navigation.Sign In')}
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

export default LoginForm;
