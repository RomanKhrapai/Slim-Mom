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
    category: [
      {
        id: '5d51694802b2373622ff553b',
        name: 'Яйце куряче',
      },
      {
        id: '5d51694802b2373622ff554d',
        name: 'Горох',
      },
      {
        id: '5d51694802b2373622ff554k',
        name: 'Сік яблуневий',
      },
      {
        id: '5d51694802b2373622ff554j',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554h',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554g',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554f',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554s',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554a',
        name: 'Горох маш Ярмарка Платинум',
      },
      {
        id: '5d51694802b2373622ff554q',
        name: 'Горох маш Ярмарка Платинум',
      },
    ],
  },
  {
    userId: 2,
    name: 'user2',
    age: 20,
    blood: 4,
    current: 80,
    height: 165,
    desired: 56,
    category: [
      {
        id: '5d51694802b2373622ff553b',
        name: 'Яйце куряче',
      },
      {
        id: '5d51694802b2373622ff554d',
        name: 'Горох',
      },
      {
        id: '5d51694802b2373622ff554k',
        name: 'Сік яблуневий',
      },
    ],
  },
  {
    userId: 3,
    name: 'user3',
    age: null,
    blood: 1,
    current: null,
    height: null,
    desired: null,
    category: [
      {
        id: '5d51694802b2373622ff554k',
        name: 'Сік яблуневий',
      },
    ],
  },
];

// const userId = users[0].userId;
// const user = users.find(user => user.userId === userId);

//импорт данных getDailyCalories с редюсера
const getDailyCalories = user => {
  if (user.current === null) {
    return 0;
  }
  if (!user) {
    return 0;
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

  const user = false;

  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      return;
    }
    setDailyrate(getDailyCalories(user));
    setLeftCkal(dailyRate - consuned);

    setConsumed(Math.floor((porc * kall) / 100));
    setNormal(Math.floor((consuned / dailyRate) * 100));
    setCategory(user.category);
  }, [dailyRate, consuned, user, porc, kall]);

  function addLeadingZeroKcal(value) {
    return String(value).padStart(3, '0');
  }

  return (
    <div className={s.container}>
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
        {!user ? (
          <div className={s.box_food_list}>
            {<p className={s.title}>{category}</p>}
          </div>
        ) : (
          <div className={s.box_food_list}>
            {user.category.map(({ id, name }) => (
              <p key={id} className={s.title}>
                {name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RightSideBar;
