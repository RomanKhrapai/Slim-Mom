import { Formik } from 'formik';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import authOperations from 'redux/auth/auth-operations.js';

import s from './RegisterForm.module.scss';

const getActiveClass = condition => {
  if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
  return `${s.label} ${s.labelAbsolute}`;
};


const RegisterForm = () => {
  const [formData, setFormData] = useState({});
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
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
          errors.name = t('authentification.This filed must contain more than 3 symbols');
        } else if (
          !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(values.name)) {
          errors.name = t('authentification.This filed must contain only letters');
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
          errors.password = t("authentification.This filed must contain more than 8 symbols");
        }
        return errors;
      }}
      onSubmit={(values, { resetForm }) => {
        /*setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);*/
        dispatch(authOperations.signUpUser({values}))
        /*setFormData(values);*/
        resetForm();
        /*dispatch(authOperations.logIn({ email, password }));*/
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
          <button className={s.registration_button} type="submit">
          {t('navigation.Registration')}
          </button>
          </div>
        </form>
         )
        }
      </Formik>
    </>
  );
};

export default RegisterForm;

/*RegisterForm.propTypes = {
  userData: PropTypes.object,
};*/



/*export default function RegisterForm() {
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
        <form className={s.form} onSubmit={handleSubmit}>
          <label className={s.label}>
            <span>{t('authentification.Name')}</span>
            <input
              className={s.input}
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
          <label className={s.label}>
            <span>{t('authentification.Email')}</span>
            <input
              className={s.input}
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder={t('authentification.Your email')}
              aria-label="Input for your email"
            
            />
          </label>
          <label className={s.label}>
            <span>{t('authentification.Password')}</span>
            <input
              className={s.input}
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
        */

    /*if (!name.trim() || !email.trim() || !password.trim()) {
      return toast.error('Please, fill all fields in the form');
    } else if (name.length < 3 & name.length > 254) {
      return toast.info('Your name must contain 3-254 symbols');
    } else if (password.length < 8) {
      return toast.info('Password must contain 8-254 symbols');
    }*/