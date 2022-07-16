import React, { useState } from 'react';
import DailyCaloriesForm from '../DailyCaloriesForm';
import UserInfo from './UserInfo';
import Button from 'components/Button/Button';
import s from './CalculatorCalorie.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import style from '../DailyCaloriesForm//DailyCaloriesForm.module.scss';

const сalculatorСalorie = () => {
  // функція для перекладу
  const { t } = useTranslation();

  const [activeModerate, setActiveModerate] = useState(false);
  const user = useSelector(state => state.auth.user);

  const changeActive = () => {
    setActiveModerate(!activeModerate);
  };

  if (!activeModerate) {
    return (
      <>
        <h2 className={s.title}>{t('calculator.Your Parametrs')}:</h2>
        <div>
          <UserInfo userData={user} />
          <Button type="button" className={style.Button} onClick={changeActive}>
            {t('calculator.Add information')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className={s.box}>
      <div>
        <DailyCaloriesForm
          userData={{
            height: user.height,
            age: user.age,
            current: user.currentWeight,
            desired: user.desiredWeight,
            blood: user.bloodType,
          }}
        />
        <Button type="button" onClick={changeActive} className={s.button}>
          {t('calculator.Revoke Changes')}
        </Button>
      </div>
    </div>
  );
};

export default сalculatorСalorie;
