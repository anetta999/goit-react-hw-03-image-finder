import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <ul>
      {images.map(image => {
        return (
          <li key={image.id}>
            <ImageGalleryItem image={image} />
          </li>
        );
      })}
    </ul>
  );
};
