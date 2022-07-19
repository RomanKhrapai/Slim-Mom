import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import productsSelectors from '../../redux/user/user-selector';
import authSelectors from 'redux/auth/auth-selectors';
import userOperations from '../../redux/user/user-operation';
import i18n from '../../services/i18n/config';
import classNames from 'classnames';
import style from './DiaryAddProductForm.module.scss';
import addIcon from '../../images/plus-icon.svg';
import arrow from '../../images/arrow1.svg';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';
import { useFilterSringToQuery } from 'hooks/useFilterSringToQuery';

export default function DiaryAddProductForm({
  isFormOpen,
  setIsFormOpen,
  addClass,
}) {
  const [{ isDark }] = useContext(ThemeContext);
  const [productList, setProductList] = useState([]);
  const [chosenProduct, setChosenProduct] = useState('');
  const currentDate = useSelector(productsSelectors.getTodayDate);
  const groupBlood = useSelector(authSelectors.getBloodType);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validate = values => {
    const errors = {};
    if (!values.productName) {
      errors.productName = t('diary.Required');
      // } else if (!(/^[A-Za-zА-Яа-я0-9]+$/).test(values.productName)) {
    } else if (typeof values.productName !== 'string') {
      errors.productName = t(
        'diary.Your request should not have a specific symbols'
      );
    } else if (values.productName.length > 50) {
      errors.productName = t('diary.Your request is too long');
    }

    if (!values.productAmount) {
      errors.productAmount = t('diary.Required');
    } else if (!/^[0-9]+$/.test(values.productAmount)) {
      errors.productAmount = t('diary.Must be a number');
    } else if (values.productAmount.length > 10) {
      errors.productAmount = t(
        'diary.Your amount is too long. Please, enter your amount in grams'
      );
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { productName: '', productAmount: '' },
    validate,
    onSubmit: (values, { resetForm }) => {
      let productId = chosenProduct;
      if (productList.length !== 0 && !productId) {
        const value = productList.find(
          product =>
            product.title.en === formik.values.productName ||
            product.title.ua === formik.values.productName
        );
        if (!value) {
          alert('Виберіть продукт зі списку');
          return;
        } else {
          productId = value._id;
        }
      }

      if (!productId) {
        alert('такого продукту немає');
        return;
      }
      const data = {
        productId,
        amount: values.productAmount,
        date: currentDate,
      };
      dispatch(userOperations.addProductToDiary(data));
      resetForm({ values: { productName: '', productAmount: '' } });
      setProductList([]);
      setChosenProduct('');
    },
  });

  useEffect(async () => {
    const request = formik.values.productName.trim();
    if (request.length > 2) {
      setProductList(await getProducts(request));
    }
  }, [formik.values.productName]);

  useEffect(() => {
    if (chosenProduct === productList[0]?._id && productList.length === 1) {
      setProductList([]);
    }
  }, [chosenProduct, productList]);

  const getProducts = async userRequest => {
    try {
      const { data } = await axios.get(
        `/products?title=${useFilterSringToQuery(userRequest)}`
      );
      return data.data.result;
    } catch (error) {
      console.log(error);
    }
  };

  const closeButton = () => {
    setIsFormOpen(false);
    formik.resetForm();
  };

  const openFormClasses = classNames(style.form, style.form__isOpen, addClass);
  const closeFormClasses = classNames(
    style.form,
    style.form__isClosed,
    addClass
  );

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

        <div
          className={
            isDark ? style.productListContainerDark : style.productListContainer
          }
        >
          {/* {formik.values.productName.length > 0 ? */}
          {productList.length > 0 ? (
            <ul className={style.productList}>
              {productList.map(product => {
                const productName =
                  i18n.language === 'uk' ? product.title.ua : product.title.en;
                const darkStyles = product.groupBloodNotAllowed[groupBlood]
                  ? `${style.productListItemDark} ${style.foodNotRecommended}`
                  : `${style.productListItemDark}`;
                const whiteStyles = product.groupBloodNotAllowed[groupBlood]
                  ? `${style.productListItem} ${style.foodNotRecommended}`
                  : `${style.productListItem}`;
                return (
                  <li
                    key={product._id}
                    className={isDark ? darkStyles : whiteStyles}
                    onClick={() => {
                      setChosenProduct(product._id);
                      formik.values.productName = productName;
                      setProductList([]);
                    }}
                  >
                    {productName}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>
              {formik.values.productName.length > 3 &&
                productList === [] &&
                t('diary.The product is not founded')}
            </p>
          )}
        </div>
      </div>

      <div className={style.errorContainer}>
        <input
          type="productAmount"
          name="productAmount"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.productAmount}
          className={style.input}
          placeholder={t('diary.Grams')}
        />

        <div className={style.errorMessage}>
          {formik.touched.productAmount && formik.errors.productAmount
            ? formik.errors.productAmount
            : null}
        </div>
      </div>

      <button
        onClick={() => closeButton()}
        type="button"
        className={style.closeButton}
      >
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
  addClass: PropTypes.string,
};
