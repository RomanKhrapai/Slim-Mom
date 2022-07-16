import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import userOperations from '../../redux/user/user-operation';
import productsSelectors from '../../redux/user/user-selector';
import { useTranslation } from 'react-i18next';
import DiaryDateСalendar from '../../components/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList';
import Container from 'components/Container/Container';
import Button from 'components/Button/Button';
import style from './DiaryPage.module.scss';
import addIcon from '../../images/plus-icon.svg';
import RightSideBar from '../../components/RightSideBar';
import s from '../../components/RightSideBar/RightSideBar.module.scss';

export default function DiaryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const currentDate = useSelector(productsSelectors.getTodayDate);
  let chosenDate = useSelector(productsSelectors.getChosenDate);

  chosenDate = currentDate;
  userOperations.getDayProducts(chosenDate);
  const { t } = useTranslation();
  
  console.log(chosenDate);
  console.log(currentDate);

  return (
    <div className={s.health_box}>
      <Container className={style.container}>
        <h1 className={style.hidden}>{t('diary.Diary')}</h1>

        <DiaryDateСalendar />
        {chosenDate === currentDate ? (
          <DiaryAddProductForm
            isFormOpen={isFormOpen}
            setIsFormOpen={() => setIsFormOpen(false)}
          />
        ) : null}
        <DiaryProductsList
        //  chosenDate={chosenDate}
        />

        {chosenDate === currentDate ? (
          <Button
            type="button"
            className={style.buttonShowAddProductForm}
            onClick={() => setIsFormOpen(true)}
          >
            <img
              src={addIcon}
              alt={`add product icon`}
              className={style.addIcon}
            />
          </Button>
        ) : null}
      </Container>
      <RightSideBar />
    </div>
  );
}
