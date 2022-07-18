import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from './MainPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import PageTitle from '../components/PageTitle/PageTitle';
import DailyCaloriesForm from 'components/DailyCaloriesForm';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';
import Container from 'components/Container/Container';
import Loader from '../components/Loader';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import authOperations from '../redux/auth/auth-operations';
const MainPage = ({ showModal, toggleModal }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const refreshToken = searchParams.get('refreshToken');
  const accessToken = searchParams.get('accessToken');
  useEffect(() => {
    if (refreshToken && accessToken) {
      searchParams.delete('refreshToken');
      searchParams.delete('accessToken');
      dispatch(authOperations.fetchCurrentUser({ refreshToken, accessToken }));
      setSearchParams(searchParams);
    }
  }, [refreshToken, searchParams, accessToken]);

  const { t, i18n } = useTranslation();
  const loading = useSelector(state => state.auth.isLoading);

  return (
    <div className={s.images_container}>
      <Container className={s.container}>
        <WrapperDisplayNone showModal={showModal}>
          <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
          <DailyCaloriesForm onOpenModal={toggleModal} />
        </WrapperDisplayNone>
        {loading && <Loader />}
        {showModal && (
          <Modal onClose={toggleModal}>
            <ModalContent onClose={toggleModal} />
          </Modal>
        )}
      </Container>
    </div>
  );
};

MainPage.propTypes = {
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};

export default MainPage;
