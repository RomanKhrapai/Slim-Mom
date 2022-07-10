import React from 'react';

import { useTranslation } from 'react-i18next';

import CalculatorСalorie from '../components/CalculatorСalorie';


const CalculatorPage = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('Calculate your daily calorie intake')}</h1>
      <CalculatorСalorie />
    </div>
  );
};

export default CalculatorPage;
