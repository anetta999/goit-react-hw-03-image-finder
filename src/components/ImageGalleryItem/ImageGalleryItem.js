import { Modal } from 'components/Modal/Modal';

import React, { Component } from 'react';
import { Image, ImageWrap } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }));
  };

  render() {
    const { image } = this.props;
    const { isModalOpen } = this.state;

    isModalOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');

    return (
      <>
        <ImageWrap onClick={this.toggleModal}>
          <Image src={image.webformatURL} alt={image.tags} />
        </ImageWrap>
        {isModalOpen && <Modal image={image} onClose={this.toggleModal} />}
      </>
    );
  }
}
