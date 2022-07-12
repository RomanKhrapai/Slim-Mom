import React, { useState, useEffect } from 'react';
import s from './RightSideBar.module.scss';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const users = [
  {
    userId: 1,
    name: 'user1',
    age: 27,
    blood: 2,
    current: 75,
    height: 170,
    desired: 65,
    category: ['meet', 'coffe', 'solt'],
  },
  {
    userId: 2,
    name: 'user2',
    age: 20,
    blood: 4,
    current: 80,
    height: 165,
    desired: 56,
    category: 'fish',
  },
  {
    userId: 3,
    name: 'user3',
    age: null,
    blood: 1,
    current: null,
    height: null,
    desired: null,
    category: 'coffe',
  },
  {
    _id: {
      $oid: '5d51694902b2373622ff5f81',
    },
    categories: {
      en: 'безalcoholic beverages',
      ua: 'безалкогольні напої',
    },
    weight: 100,
    title: {
      en: 'Apple compote',
      ua: 'Яблучний компот',
    },
    calories: 85,
    groupBloodNotAllowed: [null, false, false, false, false],
    __v: 0,
  },
];

const userId = users[0].userId;
const user = users.find(user => user.userId === userId);

//импорт данных getDailyCalories с редюсера
const getDailyCalories = user => {
  if (user.current === null) {
    return 0;
  }
  if (!user) {
    return;
  }
  return (
    10 * Number(user.current) +
    6.25 * Number(user.height) -
    5 * Number(user.age) -
    161 -
    10 * (Number(user.current) - Number(user.desired))
  );
};
// импорт данных про каллории и вес блюда
// const kall = null;
// const porc = null;

const kall = 325;
const porc = 300;

// импорт данных прокатегории запрещенных продуктов

function RightSideBar() {
  const [leftCkal, setLeftCkal] = useState(0);
  const [consuned, setConsumed] = useState(0);
  const [dailyRate, setDailyrate] = useState(0);
  const [normal, setNormal] = useState(0);
  const [category, setCategory] = useState('Your diet will be displayed here');

  // let location = useLocation();
  // console.log('location', location);

  const { t } = useTranslation();

  useEffect(() => {
    setDailyrate(getDailyCalories(user));
    setLeftCkal(dailyRate - consuned);

    setConsumed(Math.floor((porc * kall) / 100));
    setNormal(Math.floor((consuned / dailyRate) * 100));
    setCategory(user.category);
  }, [dailyRate, consuned, user]);

  console.log('leftCkal', leftCkal);
  console.log('consuned', consuned);
  console.log('dailyRate', dailyRate);
  console.log('normal', normal);
  console.log('category', category);

  function addLeadingZeroKcal(value) {
    return String(value).padStart(3, '0');
  }

  return (
    <div className={s.container}>
      {/* <img className={s.img_tablet} src="../../images/LayerTablet.png" />
      <img className={s.img_health} src="../../images/LayerTablet.png" /> */}
      <div className={s.box}>
        <h2 className={s.h2_title}> {t('Summary for')} -Data-</h2>
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
        <p className={s.title}>{category}</p>
      </div>
    </div>
  );
}

export default RightSideBar;

// const getDailyRateUser = () => {
//     const dailyRate = getDailyCalories()
//     // setDailyrate(dailyRate);
//     return dailyRate;
// };

// const getLeftCkalUser = () => {
//     const left = getDailyRateUser() - getConsumedUser();
//     // setLeftCkal(left);
//     return left

// }

// const getConsumedUser = () => {
//     const consunedUser = Math.floor((porc * kall) / gr);
//     // setConsumed(consunedUser);
//     return consunedUser ;

// }

// const getNormalUser = () => {
//     const normalUser = Math.floor((getConsumedUser() / getDailyRateUser()) * 100);
//     // setNormal(normalUser);
//     return normalUser;
// }

// const getCategoryUser = () => {
//     const categoryUser = user.category;
//     // setCategory(categoryUser);
//     return categoryUser;
// }

// <div>
//     <h1> Summary for 06/20/2020</h1>
//     <ul>
//         <li>Left {getLeftCkalUser()}kcal</li>
//         <li>Consumed {getConsumedUser()}kcal</li>
//         <li>Daily rate {getDailyRateUser()}kcal</li>
//         <li>n% of normal {getNormalUser()}%</li>
//     </ul>

//     <h1>Food not recommended</h1>
//     <ul>
//         <li>{getCategoryUser()}</li>
//     </ul>
// </div>

// npm install --save react-datetime
