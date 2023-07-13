import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css"

export const ImgGalleryItem = ({ image, largeImageURL }, key) => {
  return (
<li key={key} className={css.gallery_item}>
          <img className={css.gallery_img} src={image} alt="" data-url={largeImageURL}/>
</li>
     )
}

 ImgGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};