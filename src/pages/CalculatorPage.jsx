import React from 'react';

import { useTranslation } from 'react-i18next';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../components/CalculatorСalorie';
import PageTitle from '../components/PageTitle/PageTitle';
import Container from 'components/Container/Container';
import s from '../components/RightSideBar/RightSideBar.module.scss';
import style from './CalculatorPage.module.scss';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

const CalculatorPage = () => {
  const { t } = useTranslation();
  const loading = useSelector(state => state.auth.isLoading);

  return (
    <div className={s.health_box}>
      {/* <div style={{marginTop: '200px'}}> */}
      <Container className={style.container}>
      <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
        <CalculatorСalorie />
        { loading && <Loader /> }
    </Container>
      {/* </div> */}
      <RightSideBar />
    </div>

  );
};

export default CalculatorPage;
