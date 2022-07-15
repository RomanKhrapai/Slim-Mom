import { React } from 'react';
import styles from '../Modal/ModalContent.module.scss';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function ModalContent({dailyCalories,forbiddenProducts}) {
  const { t, i18n } = useTranslation();
const navigate = useNavigate()
const navigateToRegister = ()=>{
  navigate("/registration")
}
  return (
    <>
      <h2 className={styles.modal__title}>
        {t(`modal.Your recommended daily calorie intake is`)}
      </h2>
      <p className={styles.modal__calories}>
        {dailyCalories} <span className={styles.modal__calories_small}>{t('modal.kcal')}</span>
      </p>
      <div className={styles.modal__list_wrapper}>
        <h3 className={styles.modal__second_title}>
          {t('modal.Foods you should not eat')}
        </h3>
        <ol className={styles.modal__list}>
         {
        forbiddenProducts && forbiddenProducts.map(product =>(
          <li key={product}>{product}</li>
        ))
        }
        </ol>
      </div>
      <Button className={styles.button_additional} type="button" onClick={navigateToRegister}>
        {t('modal.Start losing weight')}
      </Button>
    </>
  );
}

ModalContent.propTypes = {
  dailyCalories: PropTypes.number,
  forbiddenProducts: PropTypes.array,
};
