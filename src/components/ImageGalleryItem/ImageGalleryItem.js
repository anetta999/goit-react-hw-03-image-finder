export const ImageGalleryItem = ({ image: webformatURL, tags }) => {
  return (
    <>
      <img src={webformatURL} alt={tags} width="300" />
    </>
  );
};
