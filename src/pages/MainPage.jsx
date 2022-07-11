import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import DailyCaloriesForm from 'components/DailyCaloriesForm';
import Modal from 'components/Modal';
import ModalContent from 'components/Modal/ModalContent';
import WrapperDisplayNone from 'components/WrapperDisplayNone/WrapperDisplayNone';

const MainPage = () => {
  const { t, i18n } = useTranslation();
  const [dailyCalories, setDailyCalories] = useState(null);
  const [forbiddenProducts, setForbiddenProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div><WrapperDisplayNone showModal={showModal}>
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
    </div>
  );
};

export default MainPage;
