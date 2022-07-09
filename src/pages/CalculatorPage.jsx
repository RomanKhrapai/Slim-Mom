import React from 'react';
import CalculatorСalorie from 'Components/CalculatorСalorie';
import { useTranslation } from 'react-i18next';

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