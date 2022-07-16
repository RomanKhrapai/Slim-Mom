import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import productsSelectors from '../../redux/user/user-selector';
import userOperations from '../../redux/user/user-operation';
import i18n from '../../services/i18n/config';
import classNames from 'classnames';
import style from './DiaryAddProductForm.module.scss';
import addIcon from '../../images/plus-icon.svg';
import arrow from '../../images/arrow1.svg';

export default function DiaryAddProductForm({ isFormOpen, setIsFormOpen }) {
  const [productList, setProductList] = useState([]);
  const [chosenProduct, setChosenProduct] = useState("");
  const currentDate = useSelector(productsSelectors.getTodayDate);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validate = values => {
    const errors = {};
    if (!values.productName) {
      errors.productName = t('diary.Required');
    } else if (values.productName.length > 50) {
      errors.productName = t('diary.Your request is too long');
    }

    if (!values.productAmount) {
      errors.productAmount = t('diary.Required');
    } else if (!+values.productAmount) {
      errors.productAmount = t('diary.Must be a number');
    } else if (values.productAmount.length > 10) {
      errors.productAmount = t('diary.Your amount is too long. Please, enter your amount in grams');
    } else if (!Number.isInteger(values.productAmount))
      errors.productAmount = t('diary.Must be an integer number');

    return errors;
  };

  const formik = useFormik({
    initialValues: { productName: '', productAmount: '' },
    validate,
    onSubmit: values => {
      const data = {
        productId: chosenProduct,
        amount: values.productAmount,
        date: currentDate,
      }
      dispatch(userOperations.addProductToDiary(data))
      formik.resetForm();
    },
  });

  const getProducts = async userRequest => {
    try {
      const { data } = await axios.get(`/products?title=${userRequest}`);
      return data.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    const request = formik.values.productName.trim();
    if (request.length > 2) {
      setProductList(await getProducts(request));
    }
  }, [formik.values.productName]);

  useEffect(() => {
    if (chosenProduct === productList[0]?._id && productList?.length === 1) {
      setProductList([])
    }
  }, [chosenProduct, productList])

  const closeButton = () => {
    setIsFormOpen(false);
    formik.resetForm();
  };

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
          value={formik.values.productName}
          className={style.input}
          placeholder={t('diary.Enter product name')}
        />

        <div className={style.errorMessage}>
          {formik.touched.productName && formik.errors.productName
            ? formik.errors.productName
            : null}
        </div>

        <div className={style.productListContainer}>
          <ul>
            {productList.map(product => {
              const productName =
                i18n.language === 'uk' ? product.title.ua : product.title.en;
              return (
                <li
                  key={product._id}
                  className={style.productListItem}
                  onClick={() => {
                    setChosenProduct(product._id);
                    formik.values.productName = productName
                    console.log(productName);
                  }}
                >
                  {productName}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className={style.errorContainer}>
        <input
          type="productAmount"
          name="productAmount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gramsAmount}
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

      <button type="submit" className={style.buttonAddDesktop}>
        <img src={addIcon} alt={`add product icon`} className={style.addIcon} />
      </button>

      <button type="submit" className={style.buttonAddMobile}>
        {t('diary.Add')}
      </button>
    </form>
  );
}

DiaryAddProductForm.propTypes = {
  isFormOpen: PropTypes.bool,
  setIsFormOpen: PropTypes.func,
  currentDate: PropTypes.string
};
