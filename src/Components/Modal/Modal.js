import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.scss';
import crossIcon from '../../images/cross.svg';
import arrowIcon from '../../images/arrow1.svg'

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return createPortal(
    <div className={s.backdrope} onClick={handleBackdropClick}>
      <div className={s.modal}>
      <button className={s.modal__close_button} onClick={onClose}>
            <img className={s.modal__cross_icon} src={crossIcon} alt="cross" />
          </button>
          <button className={s.modal__close_mobile} onClick={onClose}>
            <img className={s.modal__arrow_icon} src={arrowIcon} alt="arrow" />
          </button>
        {children}</div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
