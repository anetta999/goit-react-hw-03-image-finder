import { Modal } from 'components/Modal/Modal';

import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = evt => {
    evt.preventDefault();
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { image } = this.props;
    const { isModalOpen } = this.state;

    return (
      <>
        <a href="##" onClick={this.openModal}>
          <img src={image.webformatURL} alt={image.tags} width="300" />
        </a>
        {isModalOpen && <Modal image={image} onClose={this.closeModal} />}
      </>
    );
  }
}

// export default ImageGalleryItem

// export const ImageGalleryItem = ({ image }) => {
//   return (
//     <>
//       <img src={image.webformatURL} alt={image.tags} width="300" />
//       <Modal image={image} />
//     </>
//   );
// };
