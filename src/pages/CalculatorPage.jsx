import React from 'react';

import { useTranslation } from 'react-i18next';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../components/CalculatorСalorie';
import PageTitle from '../components/PageTitle/PageTitle';

import s from '../components/RightSideBar/RightSideBar.module.scss';

const CalculatorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={s.health_box}>
      <div style={{marginTop: '200px'}}>
      <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
        <CalculatorСalorie />
      </div>
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
