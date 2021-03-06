import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n/config';
import { productsSelectors, userOperations } from '../../redux/user';

import s from './RightSideBar.module.scss';

function RightSideBar() {
  const [leftCkal, setLeftCkal] = useState(0);
  const [consuned, setConsumed] = useState(0);
  const [normal, setNormal] = useState(0);
  const [category, setCategory] = useState([]);

  const language = i18n.language === 'uk' ? 'ua' : 'en';
  const dispatch = useDispatch();
  const { t } = useTranslation();

  let dailyRate = useSelector(productsSelectors.getDailyCalorieIntake);
  const chosenDate = useSelector(productsSelectors.getChosenDate);
  const currentDate = useSelector(productsSelectors.getTodayDate);
  const products = useSelector(productsSelectors.getDiaryProducts);
  const userInfo = useSelector(productsSelectors.getUserInfo);
  const productsNotRecommended = useSelector(
    productsSelectors.getProductsNotRecommended
  );

  const userRequest = {
    age: userInfo.age,
    bloodType: userInfo.bloodType,
    currentWeight: userInfo.currentWeight,
    desiredWeight: userInfo.desiredWeight,
    height: userInfo.height,
    language,
  };

  let kall = 0;
  let porc = 0;
  let consum = 0;
  let cons = 0;

  for (const product of products) {
    kall = product.productId.calories;
    porc = product.amount;
    cons = Math.round((porc * kall) / 100);
    consum += cons;
  }

  useEffect(() => {
    if (userInfo.dailyCalorieIntake === null || userInfo === null) {
      return;
    }

    dispatch(userOperations.addUserInfo(userRequest));
  }, [language]);

  useEffect(() => {
    if (products === [] || chosenDate === '' || !chosenDate) {
      return;
    }

    dispatch(userOperations.getDayProducts(chosenDate));
  }, [chosenDate]);

  useEffect(() => {
    if (dailyRate === '') {
      return (dailyRate = 0);
    }

    setLeftCkal(Number(dailyRate) - Number(consum));
    setConsumed(consum);
    setNormal(((consum / dailyRate) * 100).toFixed(1));
    setCategory(productsNotRecommended);
  }, [dailyRate, consuned, porc, kall, normal, chosenDate, consum]);

  function addLeadingZeroKcal(value) {
    return String(value).padStart(3, '0');
  }

  return (
    <div className={s.container}>
      <div className={s.box}>
        <h2 className={s.h2_title}>
          {' '}
          {t('Summary for')}{' '}
          {chosenDate === currentDate ? `${currentDate}` : `${chosenDate}`}
        </h2>
        <ul className={s.list}>
          <li className={s.title}>
            <span>{t('Left')}</span>{' '}
            <span className={leftCkal < 0 ? s.error : s.good}>
              {leftCkal === 0 ? addLeadingZeroKcal('0') : leftCkal}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>{' '}
          </li>
          <li className={s.title}>
            <span>{t('Consumed')}</span>{' '}
            <span>
              {consuned === 0 ? addLeadingZeroKcal('0') : consuned}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>{' '}
          </li>
          <li className={s.title}>
            <span>{t('Daily rate')}</span>
            <span>
              {addLeadingZeroKcal(dailyRate)}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>
          </li>
          <li className={s.title}>
            <span>{t('n% of normal')}</span>{' '}
            <span>
              {normal == 0 ? 0 : normal}

              <span className={s.span_kcal}>%</span>
            </span>
          </li>
        </ul>
      </div>
      <div className={s.box_food}>
        <h2 className={s.h2_title}>{t('Foods you should not eat')}</h2>
        {dailyRate === '' ? (
          <div className={s.box_food_list}>
            {<p className={s.title}>{t('Your diet will be displayed here')}</p>}
          </div>
        ) : (
          <div className={s.box_food_list}>
            {productsNotRecommended.map(i => (
              <p key={i} className={s.title}>
                {i}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideBar;
