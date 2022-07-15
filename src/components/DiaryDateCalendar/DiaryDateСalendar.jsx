import React, { useState } from 'react';
// import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import style from'./DiaryDateСalendar.module.scss';
import calendarIcon from '../../images/icon-calendar.svg';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import Modal from '../Modal';
import { useContext } from 'react';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';

export default function DiaryDateCalendar() {
  const [{isDark}] = useContext(ThemeContext)
  const [formattedDate, setFormattedDate] = useState(moment().format('DD, MM, YYYY'));
  const [parsedDate, setParsedDate] = useState(Date.now());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getDateTime = (momentDate) => {
    const parsedDate = Date.parse(momentDate._d.toString())
    const formattedDate = momentDate.format('DD, MM, YYYY')
    console.log(parsedDate, formattedDate);

    setParsedDate(parsedDate)
    setFormattedDate(formattedDate)
  }

  return (
    <div className={style.datepicker}>
      <h2 className={isDark ? style.title_light : style.title}>{formattedDate}</h2>
      <button onClick={() => setIsCalendarOpen(!isCalendarOpen)} type="button" className={style.dateButton}>
        <img src={calendarIcon} alt={`calendar icon`} />
      </button>

      {isCalendarOpen && <Modal onClose={() => setIsCalendarOpen(false)}>
        <div className={style.calendarWrapper}>

          <Datetime isValidDate={(current) => {
            let today = new Date()
            return current.isBefore(today)
          }} value={parsedDate} input={false} timeFormat={false} dateFormat={'DD, MM, YYYY'}  onChange={getDateTime}/>
        </div>

      </Modal>}
     </div>
  );
}
