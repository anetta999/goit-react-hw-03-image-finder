import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList, GalleryListItem } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => {
  return (
    <GalleryList>
      {images.map(image => {
        return (
          <GalleryListItem key={image.id}>
            <ImageGalleryItem image={image} />
          </GalleryListItem>
        );
      })}
    </GalleryList>
  );
};
