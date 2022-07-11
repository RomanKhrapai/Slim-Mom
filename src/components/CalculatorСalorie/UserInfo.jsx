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
    <div className={`${style.inputBox} ${s.UserBox}` }>
      <div className={`${style.input} inputBox`}><h3 className={`lable`}>{t("calculator.Height")} </h3> <p>{userData.height} </p></div>
      <div className={`${style.input} inputBox`}><h3 className={`lable`}>{t("calculator.Age")} </h3> <p>{userData.age}</p></div>
      <div className={`${style.input} inputBox`}><h3 className={`lable`}>{t("calculator.Current weight")} </h3> <p> {userData.current} </p></div>
      <div className={`${style.input} inputBox`}><h3 className={`lable`}>{t("calculator.Desired weight")} </h3> <p> {userData.desired} </p></div>
      <div className={`${style.input} inputBox`}><h3 className={`lable`}>{t("calculator.Blood type")}</h3> <p> {userData.blood}</p></div>
    </div>
        
  );
};

export default UserInfo;

UserInfo.propTypes = {
  userData: PropTypes.object.isRequired,
};
