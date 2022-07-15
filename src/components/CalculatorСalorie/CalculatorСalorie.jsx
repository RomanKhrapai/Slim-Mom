import React, { useState, useEffect} from 'react';
import DailyCaloriesForm from '../DailyCaloriesForm';
import UserInfo from './UserInfo';
import Button from 'components/Button/Button';
import s from './CalculatorCalorie.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import users from '../usersDB';
import style from '../DailyCaloriesForm//DailyCaloriesForm.module.scss';

// Имитация базы и поиска пользователя, для проверки работоспособности
import { useDispatch,} from 'react-redux';
// import productsOperations from '../../redux/products/products-operation';
import userOperations from 'redux/user/user-operation';
// import authOperations from 'redux/auth/auth-operations';

const сalculatorСalorie = () => {
  // функція для перекладу
  const { t } = useTranslation();
  const [activeModerate, setActiveModerate] = useState(false);
  const [user, setUser] = useState({ height: '', age: '', currentWeight: '', desiredWeight: '', bloodType: '', language: "ua" })
  const state = useSelector(state=> state)
  console.log(state);

  useEffect(()=>{
    setUser(state.auth.user.params);
  },[state, user])


  const dispatch = useDispatch();
  // Активность режима редактирования
  // const userId = 2;
  // const fetchUser = users.find(user => user.userId === userId);
  // const user = fetchUser
  //   ? fetchUser
  //   : { height: '', age: '', current: '', desired: '', blood: '' };

  const changeActive = () => {
    // dispatch(productsOperations.getAllProducts());
    // dispatch(authOperations.logIn({email: "user2test@gmail.com", password: "user2test" }));
    // dispatch(authOperations.signUpUser({ name: "user37Test", email: "user37test@gmail.com", password: "user37test" }));
  
    // dispatch(userOperations.addProductToDiary({date: "12345", productId: "5d51694802b2373622ff553b", amount: 500, }))
    // dispatch(userOperations.getDayProducts());
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
        <h2 className={s.title}>{t('calculator.Your Parametrs')}:</h2>
        <div>
        <UserInfo userData={user} />
        <Button type="button" className={style.Button} onClick={changeActive}>
          {state.auth.user.params.height
            ? t('calculator.Change information')
            : t('calculator.Add information')}
        </Button>
            </div>
        {/* <Button  type="button" disabled={fetchUser? false: true} >
          {t("calculator.View your losing weight plan")}
          </Button > */}
      </>
    );
  }

  return (
    <div className={s.box}>
      <div>
        
      <DailyCaloriesForm userData={{height: user.height, age: user.age, current: user.currentWeight, desired: user.desiredWeight, blood: user.bloodType }} />
      <Button type="button" onClick={changeActive} className={s.button}>
        {t('calculator.Close Changes')}
      </Button>
      </div>
    </div>
  );
};

export default сalculatorСalorie;
