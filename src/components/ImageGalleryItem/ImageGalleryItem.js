import { Modal } from 'components/Modal/Modal';

import React, { Component } from 'react';
import { Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = evt => {
    evt.preventDefault();
    this.setState({ isModalOpen: true });
    document.body.style.overflow = 'hidden';
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { image } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <a href="##" onClick={this.openModal}>
          <Image src={image.webformatURL} alt={image.tags} />
        </a>
        {isModalOpen && <Modal image={image} onClose={this.closeModal} />}
      </>
    );
  }
}
