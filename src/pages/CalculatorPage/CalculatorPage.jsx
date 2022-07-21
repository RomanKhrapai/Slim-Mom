import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { changeData, productsSelectors } from '../../redux/user';
import RightSideBar from 'components/RightSideBar';
import CalculatorСalorie from '../../components/CalculatorСalorie';
import PageTitle from '../../components/PageTitle/PageTitle';
import Container from 'components/Container/Container';
import Loader from '../../components/Loader';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';

import s from '../../components/RightSideBar/RightSideBar.module.scss';
import style from './CalculatorPage.module.scss';

const CalculatorPage = ({toggleModal, showModal}) => {
  const { t } = useTranslation();
  const loading = useSelector(state => state.auth.isLoading);
  const currentDate = useSelector(productsSelectors.getTodayDate);
  const dispatch = useDispatch();

  useEffect(() => {
  dispatch(changeData(currentDate));
  }, [currentDate]);

  return (
    <div className={s.health_box}>
      <Container className={style.container}>
        <WrapperDisplayNone showModal={showModal}>
          <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
          <CalculatorСalorie onOpenModal={toggleModal} />
        </WrapperDisplayNone>
        {loading && <Loader />}
      </Container>
      <RightSideBar />      
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
