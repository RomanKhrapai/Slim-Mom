import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import s from '../App.module.scss'


import DailyCaloriesForm from 'components/DailyCaloriesForm';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';
import Container from 'components/Container/Container';

const MainPage = ({showModal, toggleModal}) => {
  const { t, i18n } = useTranslation();
  const [dailyCalories, setDailyCalories] = useState(null);
  const [forbiddenProducts, setForbiddenProducts] = useState([]);

  return (
    <div className={s.images_container}>
    <Container>
      <WrapperDisplayNone showModal={showModal}>
        <h1>{t('Calculate your daily calorie intake')}</h1>
        <DailyCaloriesForm
          setDailyCalories={setDailyCalories}
          setForbiddenProducts={setForbiddenProducts}
          onOpenModal={toggleModal}
        />
      </WrapperDisplayNone>

      {showModal && (
        <Modal onClose={toggleModal}>
          <ModalContent
            forbiddenProducts={forbiddenProducts}
            dailyCalories={dailyCalories}
          />
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

