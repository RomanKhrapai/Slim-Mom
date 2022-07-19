import React, { useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-datetime/css/react-datetime.css';
import style from './DiaryDateСalendar.module.scss';
import calendarIcon from '../../images/icon-calendar.svg';
import Datetime from 'react-datetime';
import { changeData } from '../../redux/user/user-action';
import moment from 'moment';
import Modal from '../Modal';
import { ThemeContext } from 'components/ThemeProvider/ThemeProvider';

export default function DiaryDateCalendar({ chosenDate, setChosenDate }) {
  const [{ isDark }] = useContext(ThemeContext);
  const dispatch = useDispatch();

  // const [formattedDate, setFormattedDate] = useState(moment().format('DD, MM, YYYY').split(', ').join('.'));
  const [formattedDate, setFormattedDate] = useState(chosenDate);

  const [parsedDate, setParsedDate] = useState(Date.now());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const getDateTime = momentDate => {
    const parsedDate = Date.parse(momentDate._d.toString());
    const formattedDate = momentDate
      .format('DD, MM, YYYY')
      .split(', ')
      .join('.');
    setChosenDate(formattedDate);
    dispatch(changeData(formattedDate));

    setParsedDate(parsedDate);
    setFormattedDate(formattedDate);
  };

  const createdAt = useSelector(state => state.auth.user.createdAt);
  const createdDate = moment(createdAt).subtract(1, 'day'); 

  return (
    <div className={style.datepicker}>
      <h2 className={isDark ? style.title_light : style.title}>
        {formattedDate}
      </h2>
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        type="button"
        className={style.dateButton}
      >
        <img src={calendarIcon} alt={`calendar icon`} />
      </button>

      {isCalendarOpen && (
        <Modal onClose={() => setIsCalendarOpen(false)}>
          <div className={style.calendarWrapper}>
            <Datetime
              isValidDate={current => {
                let today = new Date();
                return current.isAfter(createdDate) && current.isBefore(today)
              }}
              value={parsedDate}
              input={false}
              timeFormat={false}
              dateFormat={'DD, MM, YYYY'}
              onChange={getDateTime}
              closeOnClickOutside={true}
              closeOnSelect={true}
              className={style.calendar}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}

DiaryDateCalendar.propTypes = {
  chosenDate: PropTypes.string,
  setChosenDate: PropTypes.func,
};
