import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import style from '../DailyCaloriesForm/DailyCaloriesForm.module.scss';
import s from './CalculatorCalorie.module.scss'
const UserInfo = ({ userData }) => {
  const { t } = useTranslation();
// Поля формы дневных калорий
  // const [height, setHeight] = useState("");
  // const [age, setAge] = useState("");
  // const [current, setCurrent] = useState("");
  // const [desired, setDesired] = useState("");
  // const [blood, setBlood] = useStap1");

  return (
    <div className={`${s.inputBox} ${s.userBox}` }>
      <div className={ s.input}><h3 className={s.label}>{t("calculator.Height")} </h3> <p className={s.text}>{userData.height} </p></div>
      <div className={s.input}><h3 className={s.label}>{t("calculator.Age")} </h3> <p className={s.text}>{userData.age}</p></div>
      <div className={s.input}><h3 className={s.label}>{t("calculator.Current weight")} </h3> <p className={s.text}> {userData.current} </p></div>
      <div className={s.input}><h3 className={s.label}>{t("calculator.Desired weight")} </h3> <p className={s.text}> {userData.desired} </p></div>
      <div className={s.input}><h3 className={s.label}>{t("calculator.Blood type")}</h3> <p className={s.text}> {userData.blood}</p></div>
    </div>
        
  );
};

export default UserInfo;

UserInfo.propTypes = {
  userData: PropTypes.object.isRequired,
};
