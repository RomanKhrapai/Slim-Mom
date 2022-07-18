import { React, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from '../Modal/Modal.module.scss';
import crossIcon from '../../images/cross.svg';
import arrowIcon from '../../images/arrow1.svg';
import classNames from 'classnames';
const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose, className }) {

  const backdrop = classNames(s.modal, className);
  const modal = classNames(s.modal, className);
  const close_butto = classNames(s.modal__close_button, className);
  const cross_button = classNames(s.modal__cross_icon, className);
  const modal_close_mobile = classNames(s.modal__close_mobile, className);
  const modal_arrow_icon  = classNames(s.modal__arrow_icon, className);


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
    <div className={backdrop} onClick={handleBackdropClick}>
      <div className={modal}>
        <button className={close_butto } onClick={onClose}>
          <img className={cross_button} src={crossIcon} alt="cross" />
        </button>
        <button className={modal_close_mobile} onClick={onClose}>
          <img className={modal_arrow_icon} src={arrowIcon} alt="arrow" />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};
