import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Backdrop, ModalContent } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.hendelKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.hendelKeyDown);
  }

  hendelKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  hendelBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Backdrop onClick={this.hendelBackdropClick}>
        <ModalContent>
          <img src={this.props.data.largeImg} alt={this.props.data.tags} />
          {this.props.children}
        </ModalContent>
      </Backdrop>,
      modalRoot
    );
  }
}

export { Modal };

Modal.protoType = {
  data: PropTypes.shape({
    largeImg: PropTypes.string.isRequired,
    tags: PropTypes.string,
  }),
};
