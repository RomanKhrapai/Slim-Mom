import { React, useState} from 'react';

import Header from './Components/Header';
import styles from 'App.module.scss';
import Modal from './Components/Modal';
import crossIcon from './images/cross.svg';
import arrowIcon from './images/arrow1.svg'



export const App = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
 {/* <div className={styles.App}>  */}
      <Header />
      {/* <button type="button" onClick={toggleModal}>
        open modal
      </button> */}

      {showModal && (
        <Modal onClose={toggleModal}>
          <button className={styles.modal__close_button} onClick={toggleModal}>
            <img className={styles.modal__cross_icon} src={crossIcon} alt="cross" />
          </button>
          <button className={styles.modal__close_mobile} onClick={toggleModal}>
            <img className={styles.modal__arrow_icon} src={arrowIcon} alt="arrow" />
          </button>
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
        </Modal>
      )}
{/* </div>  */}
</>
   
  );
};
