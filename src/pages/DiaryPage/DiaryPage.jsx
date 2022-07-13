import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDateСalendar from '../../components/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import style from'./DiaryPage.module.scss';
import addIcon from '../../images/plus-icon.svg';

export default function DiaryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { t } = useTranslation();
  
  return (
    <div className={style.container}>
      <PageTitle className={style.hidden}>{t('diary.Diary')}</PageTitle>
      <DiaryDateСalendar />

      <DiaryAddProductForm isFormOpen={isFormOpen} />

      <DiaryProductsList />

      <Button type="button" className={style.buttonShowAddProductForm}
      onClick={() => setIsFormOpen(true)}
      >
        <img src={addIcon} alt={`add product icon`} className={style.addIcon} />
        {/* <svg width="17" height="17">
          <use href={`${sprite}#icon-plus`}></use>
        </svg> */}
      </Button>
    </div>
  );
}