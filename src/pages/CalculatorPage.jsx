import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../components/CalculatorСalorie';
import PageTitle from '../components/PageTitle/PageTitle';
import Container from 'components/Container/Container';
import s from '../components/RightSideBar/RightSideBar.module.scss';
import style from './CalculatorPage.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { changeData, productsSelectors } from '../redux/user';
import Loader from '../components/Loader';

const CalculatorPage = () => {
  const { t } = useTranslation();
  const loading = useSelector(state => state.auth.isLoading);

  // useEffect(() => {
  const currentDate = useSelector(productsSelectors.getTodayDate);
  const dispatch = useDispatch();
  dispatch(changeData(currentDate));
  // }, []);

  return (
    <div className={s.health_box}>
      <Container className={style.container}>
        <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
        <CalculatorСalorie />
        {loading && <Loader />}
      </Container>
      <RightSideBar />
    </div>
  );
};

export default CalculatorPage;
