import { Formik } from 'formik';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import s from './DailyCaloriesForm.module.scss';


const DailyCaloriesForm = ({
  userData = { height: '', age: '', current: '', desired: '', blood: '1' }, setDailyCalories, setForbiddenProducts}) => {
//   const [formData, setFormData] = useState({});
  const { t } = useTranslation();

  const getDailyCalories = (values) => {
    return (
      10 * Number(values.current) +
      6.25 * Number(values.height) -
      5 * Number(values.age) -
      161 -
      10 * (Number(values.current) - Number(values.desired))
    );
  };

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
            values.current < valueRequire.weight.min ||
            values.current > valueRequire.weight.max
          ) {
            errors.current = t('calculator.currentError', {
              min: valueRequire.weight.min,
              max: valueRequire.weight.max,
            });
          }

          if (
            values.desired < valueRequire.weight.min ||
            values.desired > valueRequire.weight.max
          ) {
            errors.desired = t('calculator.desiredError', {
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

          if (!+values.current) {
            errors.current = t('calculator.Only numerics');
          }

          if (!+values.desired) {
            errors.desired = t('calculator.Only numerics');
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
            // setFormData(values);
            setDailyCalories(getDailyCalories(values));
            resetForm();
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
                  name="current"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.current}
                  required
                />
                {errors.current && touched.current && (
                  <div className={s.errorMessage}>{errors.current}</div>
                )}
                <label
                  className={getActiveClass(values.current)}
                  htmlFor="current"
                >
                  {t('calculator.Current weight')}, {t('calculator.kg')} *
                </label>
              </div>
              <div className={s.inputBox}>
                <input
                  className={s.input}
                  id="desired"
                  name="desired"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.desired}
                  required
                />
                {errors.desired && touched.desired && (
                  <div className={s.errorMessage}>{errors.desired}</div>
                )}
                <label
                  className={getActiveClass(values.desired)}
                  htmlFor="desired"
                >
                  {t('calculator.Desired weight')}, {t('calculator.kg')} *
                </label>
              </div>

              <div
                className={s.bloodBox}
              >
                <p className={`${s.label} ${s.labelBlood}`}>
                  {t('calculator.Blood type')} *
                </p>

                <label className={s.radio}>
                  <input
                    className={s.radioInput}
                    type="radio"
                    name="blood"
                    value="1"
                    checked={values.blood === '1'}
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
                    name="blood"
                    value="2"
                    checked={values.blood === '2'}
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
                    name="blood"
                    value="3"
                    checked={values.blood === '3'}
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
                    name="blood"
                    value="4"
                    checked={values.blood === '4'}
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

              <button type="submit">{t('calculator.Start losing weight')}</button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

DailyCaloriesForm.propTypes = {
    userData: PropTypes.object,
    setDailyCalories: PropTypes.func,
    setForbiddenProducts: PropTypes.func
};

export default DailyCaloriesForm;