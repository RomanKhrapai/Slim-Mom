import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import DailyCaloriesForm from '../DailyCaloriesForm';
import UserInfo from './UserInfo';
import Button from 'components/Button/Button';

import s from './CalculatorCalorie.module.scss';
import style from '../DailyCaloriesForm//DailyCaloriesForm.module.scss';


const сalculatorСalorie = ({ onOpenModal }) => {
  const { t } = useTranslation();
  const [activeModerate, setActiveModerate] = useState(false);
  const user = useSelector(state => state.auth.user);

  const changeActive = () => {
    setActiveModerate(!activeModerate);
  };

  if (!activeModerate) {
    return (
      <>
        <h2 className={s.title}>{t('calculator.Your Parameters')}:</h2>
        <div>
          <UserInfo userData={user} />
          <Button type="button" className={style.Button} onClick={changeActive}>
            {user.height
              ? t('calculator.Change information')
              : t('calculator.Add information')}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className={s.box}>
      <div>
        {user.height && (
          <DailyCaloriesForm userData={user} onOpenModal={onOpenModal} />
        )}
        {!user.height && <DailyCaloriesForm onOpenModal={onOpenModal} />}
        <Button type="button" onClick={changeActive} className={s.button}>
          {t('calculator.Revoke Changes')}
        </Button>
      </div>
    </div>
  );
};

export default сalculatorСalorie;

сalculatorСalorie.propTypes = {
  onOpenModal: PropTypes.func,
};
