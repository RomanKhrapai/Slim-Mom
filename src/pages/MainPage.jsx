import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

import PageTitle from '../components/PageTitle/PageTitle';
import DailyCaloriesForm from 'components/DailyCaloriesForm';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';

const MainPage = ({showModal, toggleModal}) => {
  const { t, i18n } = useTranslation();
  const [dailyCalories, setDailyCalories] = useState(null);
  const [forbiddenProducts, setForbiddenProducts] = useState([]);

  return (
    <div style={{ marginTop: '200px' }}>
      <WrapperDisplayNone showModal={showModal}>
      <PageTitle>{t('Calculate your daily calorie intake')}</PageTitle>
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
    </div>
  );
};

MainPage.propTypes = {
  showModal: PropTypes.bool,
  toggleModal: PropTypes.func,

};

export default MainPage;

