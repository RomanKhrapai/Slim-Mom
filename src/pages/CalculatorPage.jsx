import React from 'react';

import { useTranslation } from 'react-i18next';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../components/CalculatorСalorie';

import s from '../components/RightSideBar/RightSideBar.module.scss';

const CalculatorPage = () => {
  const { t } = useTranslation();

  return (
    <div className={s.health_box}>
      <div style={{marginTop: '200px'}}>
        <h1>{t('Calculate your daily calorie intake')}</h1>
        <CalculatorСalorie />
      </div>
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
