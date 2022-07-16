import { Formik } from 'formik';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PropTypes from 'prop-types';

import s from './DailyCaloriesForm.module.scss';
import Button from 'components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';

import { apdateUserInfo } from 'redux/auth/auth-reducer';
import userOperations from '../../redux/user/user-operation';
import Loader from '../Loader';

const DailyCaloriesForm = ({
  userData = { height: '', age: '', currentWeight: '', desiredWeight: '', bloodType: '1' },
  onOpenModal,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAuthorised = useSelector(state => state.auth.isAuthorised);
  const loading = useSelector(state => state.user.isLoading);

  const changeType = values => ({
      height: Number(values.height),
      age: Number(values.age),
      currentWeight: Number(values.currentWeight),
      desiredWeight: Number(values.desiredWeight),
      bloodType: Number(values.bloodType)
    });
  

  const getActiveClass = condition => {
    if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
    return `${s.label} ${s.labelAbsolute}`;
  };

  return (
    <>
      <Formik
        initialValues={userData}
        validate={values => {
          const errors = {};
          const valueRequire = {
            height: {
              min: 100,
              max: 250,
            },
            age: {
              min: 18,
              max: 100,
            },
            weight: {
              min: 20,
              max: 500,
            },
          };

          if (
            values.height < valueRequire.height.min ||
            values.height > valueRequire.height.max
          ) {
            errors.height = t('calculator.heightError', {
              min: valueRequire.height.min,
              max: valueRequire.height.max,
            });
          }

          if (
            values.age < valueRequire.age.min ||
            values.age > valueRequire.age.max
          ) {
            errors.age = t('calculator.ageError', {
              min: valueRequire.age.min,
              max: valueRequire.age.max,
            });
          }

          if (
            values.currentWeight < valueRequire.weight.min ||
            values.currentWeight > valueRequire.weight.max
          ) {
            errors.currentWeight = t('calculator.currentError', {
              min: valueRequire.weight.min,
              max: valueRequire.weight.max,
            });
          }

          if (
            values.desiredWeight < valueRequire.weight.min ||
            values.desiredWeight > valueRequire.weight.max
          ) {
            errors.desiredWeight = t('calculator.desiredError', {
              min: valueRequire.weight.min,
              max: valueRequire.weight.max,
            });
          }

          if (!+values.height) {
            errors.height = t('calculator.Only numerics');
          }

          if (!+values.age) {
            errors.age = t('calculator.Only numerics');
          }

          if (!+values.currentWeight) {
            errors.currentWeight = t('calculator.Only numerics');
          }

          if (!+values.desiredWeight) {
            errors.desiredWeight = t('calculator.Only numerics');
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const convertedType = changeType(values);

          if (isAuthorised) {
             dispatch(userOperations.addUserInfo(convertedType)).then(() => {
              onOpenModal();
              dispatch(apdateUserInfo(convertedType));
            });
  
          } else {
            dispatch(userOperations.addVisitorInfo(convertedType)).then(() => {
              onOpenModal();
              resetForm();
            });
          }
        }}
      >

        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => {
          return (
            <form className={s.form} onSubmit={handleSubmit}>
              <div className={s.inputsContainer}>
                <div className={s.inputBox}>
                  <input
                    className={s.input}
                    id="height"
                    name="height"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.height}
                    required
                  />
                  {errors.height && touched.height && (
                    <div className={s.errorMessage}>{errors.height}</div>
                  )}
                  <label
                    className={getActiveClass(values.height)}
                    htmlFor="height"
                  >
                    {t('calculator.Height')}, {t('calculator.cm')} *
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    className={s.input}
                    id="age"
                    name="age"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.age}
                    required
                  />
                  {errors.age && touched.age && (
                    <div className={s.errorMessage}>{errors.age}</div>
                  )}
                  <label className={getActiveClass(values.age)} htmlFor="age">
                    {t('calculator.Age')} *
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    className={s.input}
                    id="current"
                    name="currentWeight"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.currentWeight}
                    required
                  />
                  {errors.currentWeight && touched.currentWeight && (
                    <div className={s.errorMessage}>{errors.currentWeight}</div>
                  )}
                  <label
                    className={getActiveClass(values.currentWeight)}
                    htmlFor="current"
                  >
                    {t('calculator.Current weight')}, {t('calculator.kg')} *
                  </label>
                </div>
                <div className={s.inputBox}>
                  <input
                    className={s.input}
                    id="desired"
                    name="desiredWeight"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.desiredWeight}
                    required
                  />
                  {errors.desiredWeight && touched.desiredWeight && (
                    <div className={s.errorMessage}>{errors.desiredWeight}</div>
                  )}
                  <label
                    className={getActiveClass(values.desiredWeight)}
                    htmlFor="desired"
                  >
                    {t('calculator.Desired weight')}, {t('calculator.kg')} *
                  </label>
                </div>

                <div className={s.bloodBox}>
                  <p className={`${s.label} ${s.labelBlood}`}>
                    {t('calculator.Blood type')} *
                  </p>

                  <label className={s.radio}>
                    <input
                      className={s.radioInput}
                      type="radio"
                      name="bloodType"
                      value="1"
                      checked={values.bloodType == '1'}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className={s.radioBox}>
                      <span></span>
                    </div>
                    <span>1</span>
                  </label>

                  <label className={s.radio}>
                    <input
                      className={s.radioInput}
                      type="radio"
                      name="bloodType"
                      value="2"
                      checked={values.bloodType == '2'}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className={s.radioBox}>
                      <span></span>
                    </div>
                    <span>2</span>
                  </label>

                  <label className={s.radio}>
                    <input
                      className={s.radioInput}
                      type="radio"
                      name="bloodType"
                      value="3"
                      checked={values.bloodType == '3'}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    <div className={s.radioBox}>
                      <span></span>
                    </div>
                    <span>3</span>
                  </label>

                  <label className={s.radio}>
                    <input
                      className={s.radioInput}
                      type="radio"
                      name="bloodType"
                      value="4"
                      checked={values.bloodType == '4'}
                      required
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <div className={s.radioBox}>
                      <span></span>
                    </div>
                    <span>4</span>
                  </label>
                </div>
              </div>

              <Button className={s.Btn} type="submit">{t('calculator.Calculate')}</Button>

            </form>
          );
        }}
      </Formik>
      {loading && <Loader />}
    </>
  );
};

DailyCaloriesForm.propTypes = {
  userData: PropTypes.object,
  setDailyCalories: PropTypes.func,
  setForbiddenProducts: PropTypes.func,
  onOpenModal: PropTypes.func,
};

export default DailyCaloriesForm;
