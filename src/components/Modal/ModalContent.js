import { React } from 'react';
import styles from '../Modal/ModalContent.module.scss';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ModalContent() {
  const { t, i18n } = useTranslation();
  const dailyCalories = useSelector(state => state.user.dailyCalorieIntake);
  const productsNotRecommended = useSelector(
    state => state.user.productsNotRecommended
  );
  const navigate = useNavigate();
  const navigateToRegister = () => {
    navigate('/registration');
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
              <li key={product}>{product}</li>
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
