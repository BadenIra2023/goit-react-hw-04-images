import PropTypes from 'prop-types';
import { Component } from 'react';
import css from "./Modal.module.css";

export class Modal extends Component {
  closeByEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };

  closeByBackdrop = event => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
    window.addEventListener('click', this.closeByBackdrop);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
    window.removeEventListener('click', this.closeByBackdrop);
  }

  render() {
    const { url } = this.props;
    return (
      <div className={css.overlay} onClick={this.closeByBackdrop}>
        <div className={css.modal}>
          <img src={url} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};