import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userOperations, productsSelectors } from '../../redux/user';
import { useTranslation } from 'react-i18next';
import DiaryDateСalendar from '../../components/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList';
import Container from 'components/Container/Container';
import addIcon from '../../images/plus-icon.svg';
import RightSideBar from '../../components/RightSideBar';
import style from './DiaryPage.module.scss';
import s from '../../components/RightSideBar/RightSideBar.module.scss';
import globalStyles from '../../App.module.scss';

export default function DiaryPage() {
  const currentDate = useSelector(productsSelectors.getTodayDate);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [chosenDate, setChosenDate] = useState(currentDate)

  userOperations.getDayProducts(chosenDate);
  const { t } = useTranslation();

  const addClass = (chosenDate === currentDate) ? globalStyles.visibleElement : globalStyles.hiddenElement;
  const classesForButton = `${style.buttonShowAddProductForm} ${addClass}`;

  return (
    <div className={s.health_box}>
      <Container className={style.diaryContainer}>
        <h1 className={style.hidden}>{t('diary.Diary')}</h1>

        <DiaryDateСalendar chosenDate={chosenDate} setChosenDate={setChosenDate} />
          <DiaryAddProductForm
            isFormOpen={isFormOpen}
            setIsFormOpen={() => setIsFormOpen(false)}
            addClass={addClass}
          />
        <DiaryProductsList />

          <button
            type="button"
            className={classesForButton}
            onClick={() => setIsFormOpen(true)}
          >
            <img
              src={addIcon}
              alt={`add product icon`}
              className={style.addIcon}
            />
          </button>
      </Container>
      <RightSideBar />
    </div>
  );
}
