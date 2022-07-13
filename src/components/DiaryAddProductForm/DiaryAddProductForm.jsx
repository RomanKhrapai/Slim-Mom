import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import classNames from 'classnames';
import style from './DiaryAddProductForm.module.scss';
import addIcon from '../../images/plus-icon.svg';
import arrow from '../../images/arrow1.svg';

export default function DiaryAddProductForm({isFormOpen, setIsFormOpen}) {

  const { t } = useTranslation();

  const validate = values => {
    const errors = {};
    if (!values.productName) {
      errors.productName = t('diary.Required');
    } else if (values.productName.length > 20) {
      errors.productName = t('diary.Your request is too long');
    }

    if (!values.productAmount) {
      errors.productAmount = t('diary.Required');
    } else if (!+values.productAmount) {
      errors.productAmount = t('diary.Must be a number');
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { productName: '', productAmount: '' },
    validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const closeButton = () => {
    setIsFormOpen(false);
  }

  const openFormClasses = classNames(style.form, style.form__isOpen);
  const closeFormClasses = classNames(style.form, style.form__isClosed);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={isFormOpen === true ? openFormClasses : closeFormClasses}
    >
      <div className={style.errorContainer}>
        <input
          type="productName"
          name="productName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={style.input}
          placeholder={t('diary.Enter product name')}
        />

        <div className={style.errorMessage}>
          {formik.touched.productName && formik.errors.productName
            ? formik.errors.productName
            : null}
        </div>
      </div>

      <div className={style.errorContainer}>
        <input
          type="productAmount"
          name="productAmount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={style.input}
          placeholder={t('diary.Grams')}
        />

        <div className={style.errorMessage}>
          {formik.touched.productAmount && formik.errors.productAmount
            ? formik.errors.productAmount
            : null}
        </div>
      </div>
      
      <button onClick={() => closeButton()} type="button" className={style.closeButton}>
        <img src={arrow} alt={`arrow close icon`} />
      </button>

      <Button type="submit" className={style.buttonAddMobile}>
        {t('diary.Add')}
      </Button>

      <Button type="submit" className={style.buttonAddDesktop}>
        <img src={addIcon} alt={`add product icon`} className={style.addIcon} />
      </Button>
    </form>
  );
}

DiaryAddProductForm.propTypes = {
  isFormOpen: PropTypes.bool,
  setIsFormOpen: PropTypes.func,
}