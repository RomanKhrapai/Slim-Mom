import { React } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Button from 'components/Button/Button';

import styles from '../Modal/ModalContent.module.scss';

export default function ModalContent({ onClose }) {
  const { t, i18n } = useTranslation();
  const dailyCalories = useSelector(state => state.user.dailyCalorieIntake);
  const productsNotRecommended = useSelector(
    state => state.user.productsNotRecommended
  );

  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/registration');
    onClose();
  };

  return (
    <>
      <h2 className={styles.modal__title}>
        {t(`modal.Your recommended daily calorie intake is`)}
      </h2>
      <p className={styles.modal__calories}>
        {dailyCalories}{' '}
        <span className={styles.modal__calories_small}>{t('modal.kcal')}</span>
      </p>
      <div className={styles.modal__list_wrapper}>
        <h3 className={styles.modal__second_title}>
          {t('modal.Foods you should not eat')}
        </h3>
        <ol className={styles.modal__list}>
          {productsNotRecommended &&
            productsNotRecommended.map(product => (
              <li className={styles.modal__list_item} key={product}>{product}</li>
            ))}
        </ol>
      </div>
      <Button
        className={styles.button_additional}
        type="button"
        onClick={navigateToRegister}
      >
        {t('modal.Start losing weight')}
      </Button>
    </>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func,
};
