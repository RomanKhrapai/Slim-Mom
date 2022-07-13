import React, { useState, useEffect } from 'react';
import DailyCaloriesForm from '../DailyCaloriesForm';
import UserInfo from './UserInfo';
import Button from 'components/Button/Button';
import s from './CalculatorCalorie.module.scss';
import { useTranslation } from 'react-i18next';
import users from '../usersDB';
import style from '../DailyCaloriesForm//DailyCaloriesForm.module.scss';

// Имитация базы и поиска пользователя, для проверки работоспособности
// import { useDispatch, useSelector } from 'react-redux';
// import productsOperations from '../../redux/products/products-operation';
// import userOperations from 'redux/user/user-operation';
// import authOperations from 'redux/auth/auth-operations';

const сalculatorСalorie = () => {
  // функція для перекладу
  const { t } = useTranslation();

  // const dispatch = useDispatch();
  // Активность режима редактирования
  const userId = 2;
  const fetchUser = users.find(user => user.userId === userId);
  const user = fetchUser
    ? fetchUser
    : { height: '', age: '', current: '', desired: '', blood: '' };
  const [activeModerate, setActiveModerate] = useState(false);

  const changeActive = () => {
    // dispatch(productsOperations.getAllProducts());
    // dispatch(userOperations.getDayProducts());
    // dispatch(userOperations.getUser());
    // dispatch(authOperations.fetchCurrentUser());
    setActiveModerate(!activeModerate);
  };

  //Имитация открытия модалки
  // const openModal = () => {
  //   console.log('Modal is open');
  //   window.confirm();
  //   console.log('Modal is close');
  // };

  if (!activeModerate) {
    return (
      <>
        <h2>{t('calculator.Your Parametrs')}</h2>
        <UserInfo userData={user} />
        <Button type="button" className={style.Button} onClick={changeActive}>
          {fetchUser
            ? t('calculator.Change information')
            : t('calculator.Add information')}
        </Button>
        {/* <Button  type="button" disabled={fetchUser? false: true} >
          {t("calculator.View your losing weight plan")}
          </Button > */}
      </>
    );
  }

  return (
    <div className={s.Box}>
      <DailyCaloriesForm userData={user} />
      <Button type="button" onClick={changeActive} className={s.Button}>
        {t('calculator.Close Changes')}
      </Button>
    </div>
  );
};

export default сalculatorСalorie;
