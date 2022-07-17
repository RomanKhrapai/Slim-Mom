import React, { useState, useEffect } from 'react';
import s from './RightSideBar.module.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../../services/i18n/config';
import { useSelector, useDispatch } from 'react-redux';
import { productsSelectors, userOperations } from '../../redux/user';

function RightSideBar() {
  const [leftCkal, setLeftCkal] = useState(0);
  const [consuned, setConsumed] = useState(0);
  const [normal, setNormal] = useState(0);
  const [category, setCategory] = useState([]);

  const language = i18n.language === 'uk' ? 'ua' : 'en';
  const userInfo = useSelector(productsSelectors.getUserInfo);

  const userRequest = {
    age: userInfo.age,
    bloodType: userInfo.bloodType,
    currentWeight: userInfo.currentWeight,
    desiredWeight: userInfo.desiredWeight,
    height: userInfo.height,
    language,
  };

  const User = useSelector(state => state);
  const { t } = useTranslation();

  let dailyRate = User.user.dailyCalorieIntake;
  const currentDate = useSelector(productsSelectors.getTodayDate);
  let chosenDate = useSelector(productsSelectors.getChosenDate);
  const products = useSelector(productsSelectors.getDiaryProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userOperations.addUserInfo(userRequest));
  }, [language]);

  useEffect(() => {
    dispatch(userOperations.getDayProducts(chosenDate));
  }, [chosenDate]);

  let kall = 0;
  let porc = 0;
  let consum = 0;
  let cons = 0;

  for (const product of products) {
    kall = product.productId.calories;
    porc = product.amount;
    cons = Math.floor((porc * kall) / 100);
    consum += cons;
  }

  useEffect(() => {
    if (dailyRate === '') {
      return (dailyRate = 0);
    }
    setLeftCkal(Number(dailyRate) - Number(consum));
    setConsumed(consum);
    setNormal(Math.floor((consum / dailyRate) * 100));
    setCategory(User.user.productsNotRecommended);
  }, [dailyRate, consuned, porc, kall, normal, chosenDate]);

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
              {addLeadingZeroKcal(leftCkal)}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>{' '}
          </li>
          <li className={s.title}>
            <span>{t('Consumed')}</span>{' '}
            <span>
              {addLeadingZeroKcal(consuned)}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>{' '}
          </li>
          <li className={s.title}>
            <span>{t('Daily rate')}</span>{' '}
            <span>
              {addLeadingZeroKcal(dailyRate)}
              <span className={s.span_kcal}>{t('kcal')}</span>
            </span>
          </li>
          <li className={s.title}>
            <span>{t('n% of normal')}</span>{' '}
            <span>
              {normal}
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
            {User.user.productsNotRecommended.map(i => (
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
