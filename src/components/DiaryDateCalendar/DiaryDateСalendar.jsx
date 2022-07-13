import React from 'react';
// import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import style from'./DiaryDateСalendar.module.scss';
import calendarIcon from '../../images/icon-calendar.svg';

export default function DiaryDateСalendar() {
  return (
    <div className={style.datepicker}>
      <h2 className={style.title}>20.06.2022</h2>
      <button type="button" className={style.dateButton}>
        <img src={calendarIcon} alt={`calendar icon`} />
      </button>
    </div>
  );
}