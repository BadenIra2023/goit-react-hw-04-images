import PropTypes from 'prop-types';
import { ImgGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ images, openModal }) => {
   
  return (
    <ul className={css.image_gallery} onClick={event => openModal(event)}>
      {images.map(image => (
        <ImgGalleryItem
          key={image.id}
          image={image.webformatURL}
          largeImageURL={image.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};