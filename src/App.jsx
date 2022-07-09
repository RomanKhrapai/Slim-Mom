import { React, useState} from 'react';

import Header from './Components/Header';
import styles from 'App.module.scss';
import Modal from './Components/Modal';
import ModalContent from 'Components/Modal/ModalContent';
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
          <ModalContent onClose={toggleModal}/>
        </Modal>
      )}
{/* </div>  */}
</>
   
  );
};
