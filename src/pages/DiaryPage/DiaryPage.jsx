import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DiaryDateСalendar from '../../components/DiaryDateCalendar';
import DiaryAddProductForm from '../../components/DiaryAddProductForm';
import DiaryProductsList from '../../components/DiaryProductsList';
import PageTitle from '../../components/PageTitle/PageTitle';
import Button from 'components/Button/Button';
import style from './DiaryPage.module.scss';
import addIcon from '../../images/plus-icon.svg';
import RightSideBar from '../../components/RightSideBar';
import s from '../../components/RightSideBar/RightSideBar.module.scss';

export default function DiaryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { t } = useTranslation();

  return (
    <div className={s.health_box}>
      <div className={style.container}>
      <PageTitle className={style.hidden}>{t('diary.Diary')}</PageTitle>

      <DiaryDateСalendar />
      <DiaryAddProductForm isFormOpen={isFormOpen} setIsFormOpen={() => setIsFormOpen(false)} />
      <DiaryProductsList />

      <Button type="button" className={style.buttonShowAddProductForm} onClick={() => setIsFormOpen(true)} >
        <img src={addIcon} alt={`add product icon`} className={style.addIcon} />
      </Button>
      </div>
      <RightSideBar />
    </div>
  );
}
