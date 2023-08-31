export const ImageGalleryItem = ({ image }) => {
  return (
    <>
      <img src={image.webformatURL} alt={image.tags} width="300" />
    </>
  );
};
