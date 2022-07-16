import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../components/CalculatorСalorie';
import PageTitle from '../components/PageTitle/PageTitle';
import Container from 'components/Container/Container';
import s from '../components/RightSideBar/RightSideBar.module.scss';
import style from './CalculatorPage.module.scss';
import Loader from '../components/Loader';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';

import PropTypes from 'prop-types';

const CalculatorPage = ({ showModal, toggleModal }) => {
  const { t } = useTranslation();
  const loading = useSelector(state => state.auth.isLoading);
  const currentDate = moment().format('DD, MM, YYYY').split(', ').join('.');

  return (
    <div className={s.health_box}>
      {/* <div style={{marginTop: '200px'}}> */}
      <Container className={style.container}>
        <WrapperDisplayNone showModal={showModal}>
          <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
          <CalculatorСalorie onOpenModal={toggleModal} />
        </WrapperDisplayNone>
        {loading && <Loader />}
      </Container>
      {/* </div> */}
      <RightSideBar />
      {loading && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalContent onClose={toggleModal} />
        </Modal>
      )}
    </div>
  );
};

export default CalculatorPage;

CalculatorPage.propTypes = {
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,
};
