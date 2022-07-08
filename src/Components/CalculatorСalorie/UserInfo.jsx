import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import s from '../DailyCaloriesForm//DailyCaloriesForm.module.scss';

const UserInfo = ({ userData }) => {
// Поля формы дневных калорий
  // const [height, setHeight] = useState("");
  // const [age, setAge] = useState("");
  // const [current, setCurrent] = useState("");
  // const [desired, setDesired] = useState("");
  // const [blood, setBlood] = useState("1");

  return (
    <div className={s.inputBox}>
      <p className={`${s.input}`}><span className={`${s.labelFocus}`}>Heigth </span> <br /><span>{userData.height}</span></p>
      <p className={`${s.input}`}><span className={`${s.labelFocus}`}>Age </span> <br /><span>{userData.age}</span></p>
      <p className={`${s.input}`}><span className={`${s.labelFocus}`}>Current weight </span> <br /><span> {userData.current}</span></p>
      <p className={`${s.input}`}><span className={`${s.labelFocus}`}>Desired weigth </span> <br /><span> {userData.desired}</span></p>
      <p className={`${s.input}`}><span className={`${s.labelFocus}`}>Blood Type </span> <br /><span> {userData.blood}</span></p>
    </div>
        
  );
};

export default UserInfo;

UserInfo.propTypes = {
  userData: PropTypes.object.isRequired,
};
