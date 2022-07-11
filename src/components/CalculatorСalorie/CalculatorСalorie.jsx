import React, { useState, useEffect } from 'react';
import DailyCaloriesForm from '../DailyCaloriesForm';
import UserInfo from './UserInfo';

import { useTranslation } from 'react-i18next';

import users from '../usersDB';

// Имитация базы и поиска пользователя, для проверки работоспособности
import { useDispatch, useSelector } from 'react-redux';
// import productsOperations from '../../redux/products/products-operation';
// import userOperations from 'redux/user/user-operation';
// import authOperations from 'redux/auth/auth-operations';


const сalculatorСalorie = () => {
  // функція для перекладу
  const { t } = useTranslation();


  const dispatch = useDispatch();
  // Активность режима редактирования
  const userId = useSelector(state => state.user.id);
  const user = users.find(user => user.userId === userId);
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
        <UserInfo userData={user} />
        <button type="button" onClick={changeActive}>
          {t('calculator.Change information')}
        </button>
        {/* <button type="button" onClick={openModal}>
          {t("calculator.View your losing weight plan")}
        </button> */}
      </>
    );
  }

  return (
    <>
      <DailyCaloriesForm userData={user} />
      <button type="button" onClick={changeActive}>
        {t('calculator.Close Changes')}
      </button>
    </>
  );
};

export default сalculatorСalorie;
