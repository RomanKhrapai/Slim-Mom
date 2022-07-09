import { React } from 'react';
import styles from '../Modal/ModalContent.module.scss'


export default function ModalContent(){

    return(
        <>
          <h2 className={styles.modal__title}>
            Your recommended daily <br/> calorie intake is
          </h2>
          <p className={styles.modal__calories}>2800 <span className={styles.modal__calories_small}>kcal</span></p>
          <div className={styles.modal__list_wrapper}>
          <h3 className={styles.modal__second_title}>Foods you should not eat</h3>
          <ol className={styles.modal__list}>
            <li className={styles.modal__list_item}></li>
            <li className={styles.modal__list_item}></li>
            <li className={styles.modal__list_item}></li>
            <li className={styles.modal__list_item}></li>
          </ol>
          </div>
          <button className={styles.modal__button}>
            Start losing weight
          </button>
        </>
    )
}
