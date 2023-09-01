import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, StyledModal } from './Modal.styled';
const mmodalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleModalCloseByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalCloseByEsc);
  }

  handleModalCloseByEsc = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleModalCloseByClickOnBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { image } = this.props;
    return createPortal(
      <Backdrop onClick={this.handleModalCloseByClickOnBackdrop}>
        <StyledModal>
          <img src={image.largeImageURL} alt={image.tags} />
        </StyledModal>
      </Backdrop>,
      mmodalRoot
    );
  }
}
