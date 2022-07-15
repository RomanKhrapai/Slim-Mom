import React, { useState, useEffect } from 'react';
import s from './RightSideBar.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import userOptions from '../../redux/user/user-operation';

// импорт данных про каллории и вес блюда
const kall = null;
const porc = null;

// const kall = 320;
// const porc = 300;

function RightSideBar() {
  const [leftCkal, setLeftCkal] = useState(0);
  const [consuned, setConsumed] = useState(0);
  const [normal, setNormal] = useState(0);
  const [category, setCategory] = useState([]);

  const User = useSelector(state => state);
  const arrey = User.user.productsNotRecommended;
  let dailyRate = User.user.dailyCalorieIntake;

  const dispatch = useDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(
      userOptions.addUserInfo({
        height: '165',
        age: '45',
        currentWeight: '75',
        desiredWeight: '54',
        bloodType: '3',
        language: 'ua',
      })
    );
    if (dailyRate === '') {
      return (dailyRate = 0);
    }
    setLeftCkal(Number(dailyRate) - Number(consuned));
    setConsumed(Math.floor((porc * kall) / 100));
    setNormal(Math.floor((consuned / dailyRate) * 100));
    setCategory(User.user.productsNotRecommended);
  }, [dailyRate, consuned, porc, kall, normal]);

  function addLeadingZeroKcal(value) {
    return String(value).padStart(3, '0');
  }

  const date2 = new Date().getTime();
  const dateToday = new Date(Number(`${date2}`));

  let options = {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  const dateUser = '12.12.12';
  const dateUserToday = dateToday.toLocaleDateString('en-US', options);

  return (
    <div className={s.container}>
      <div className={s.box}>
        <h2 className={s.h2_title}>
          {' '}
          {t('Summary for')}{' '}
          {dateUserToday ? `${dateUserToday}` : `${dateUser}`}
        </h2>
        <ul className={s.list}>
          <li className={s.title}>
            <span>{t('Left')}</span>{' '}
            <span>
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

// dispatch(
//   userOptions.addProductToDiary({
//     date: '29299292',
//     productId: '5d51694802b2373622ff553b',
//     amount: 500,
//   })
// );
// dispatch(
//   userOptions.getDayProducts({
//     date: '29299292',
//     user: { user: '62d09b07b161f09579378429' },
//   })
// );
// const dailyCall = User.user.dailyCalorieIntake;
