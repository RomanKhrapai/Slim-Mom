import { React } from 'react';
import styles from '../Modal/ModalContent.module.scss';
import { useTranslation } from 'react-i18next';
import Button from 'src/components/Button/Button';

export default function ModalContent() {
  const { t, i18n } = useTranslation();

  return (
    <>
      <h2 className={styles.modal__title}>
        {t(`Your recommended daily${(<br />)} calorie intake is`)}
      </h2>
      <p className={styles.modal__calories}>
        2800 <span className={styles.modal__calories_small}>{t('kcal')}</span>
      </p>
      <div className={styles.modal__list_wrapper}>
        <h3 className={styles.modal__second_title}>
          {t('Foods you should not eat')}
        </h3>
        <ol className={styles.modal__list}>
          <li className={styles.modal__list_item}></li>
          <li className={styles.modal__list_item}></li>
          <li className={styles.modal__list_item}></li>
          <li className={styles.modal__list_item}></li>
        </ol>
      </div>
      <Button className={styles.button_additional} type="button">
        {t('Start losing weight')}
      </Button>
    </>
  );
}
