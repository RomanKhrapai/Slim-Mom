import React from 'react';

import { useTranslation } from 'react-i18next';

import CalculatorСalorie from '../components/CalculatorСalorie';
import PageTitle from '../components/PageTitle/PageTitle';


const CalculatorPage = () => {
  const { t } = useTranslation();

  return (
    <div style={{marginTop: '200px'}}>
    <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
      <CalculatorСalorie />
    </div>
  );
};

export default CalculatorPage;
