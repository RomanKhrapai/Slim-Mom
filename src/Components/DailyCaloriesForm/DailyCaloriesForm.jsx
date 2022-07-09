import { Formik } from 'formik';
import React, { useState } from 'react';

import s from './DailyCaloriesForm.module.scss';

const DailyCaloriesForm = () => {
  const [formData, setFormData] = useState({});

  const getDailyCalories = () => {
    return (
      10 * Number(formData.current) +
      6.25 * Number(formData.height) -
      5 * Number(formData.age) -
      161 -
      10 * (Number(formData.current) - Number(formData.desired))
    );
  };

  const getActiveClass = condition => {
    if (condition) return `${s.label} ${s.labelAbsolute} ${s.labelFocus}`;
    return `${s.label} ${s.labelAbsolute}`;
  };

  return (
    <>
      <Formik
        initialValues={{
          height: '',
          age: '',
          current: '',
          desired: '',
          blood: '1',
        }}
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
            errors.height = `Enter your height within ${valueRequire.height.min} - ${valueRequire.height.max} cm`;
          }

          if (
            values.age < valueRequire.age.min ||
            values.age > valueRequire.age.max
          ) {
            errors.age = `Enter your age within ${valueRequire.age.min} - ${valueRequire.age.max}`;
          }

          if (
            values.current < valueRequire.weight.min ||
            values.current > valueRequire.weight.max
          ) {
            errors.current = `Enter your weight within ${valueRequire.weight.min} - ${valueRequire.weight.max} kg`;
          }

          if (
            values.desired < valueRequire.weight.min ||
            values.desired > valueRequire.weight.max
          ) {
            errors.desired = `Enter your weight within ${valueRequire.weight.min} - ${valueRequire.weight.max} kg`;
          }

          if (!+values.height) {
            errors.height = `Only numerics`;
          }

          if (!+values.age) {
            errors.age = `Only numerics`;
          }

          if (!+values.current) {
            errors.current = `Only numerics`;
          }

          if (!+values.desired) {
            errors.desired = `Only numerics`;
          }

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          setFormData(values);
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
                  Heigh, cm *
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
                  Age *
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
                  Current weight, kg *
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
                  Desired weight, kg *
                </label>
              </div>

              <div
                className={s.bloodBox}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <p className={`${s.label} ${s.labelBlood}`}>Blood type *</p>

                <label className={s.radio}>
                  <input
                    className={s.radioInput}
                    type="radio"
                    name="blood"
                    value="1"
                    checked={values.blood === '1'}
                    required
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
                  />
                  <div className={s.radioBox}>
                    <span></span>
                  </div>
                  <span>4</span>
                </label>
              </div>

              <button type="submit">Start losing weight</button>
            </form>
          );
        }}
      </Formik>
    </>
  );
};

export default DailyCaloriesForm;
