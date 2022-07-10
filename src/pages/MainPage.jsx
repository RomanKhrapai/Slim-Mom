import {React, useState} from 'react';
import { useTranslation } from 'react-i18next';

import DailyCaloriesForm from 'components/DailyCaloriesForm';


const MainPage = () => {
  const { t, i18n } = useTranslation();


  return (
    <div>
      <h1>{t('Calculate your daily calorie intake')}</h1>
      <DailyCaloriesForm />
    </div>
  );
};

export default MainPage;
