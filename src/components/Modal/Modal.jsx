import PropTypes from 'prop-types';
import { useEffect } from 'react';
import css from "./Modal.module.css";

export const Modal = ({ closeModal, url }) => {
  useEffect(() => {
  const closeByEsc = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

    window.addEventListener('keydown', closeByEsc);
    return() => {window.removeEventListener('keydown', closeByEsc);}
    
  }, [closeModal]);
   const closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

    return (
      <div className={css.overlay} onClick={closeByBackdrop}>
        <div className={css.modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }


Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};