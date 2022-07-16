import PropTypes from 'prop-types';
import { ImageItem, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ tags, image, updateImage, largeImg }) => {
  return (
    <ImageItem
      onClick={() =>
        updateImage({
          largeImg,
          tags,
        })
      }
    >
      <Image src={image} alt={tags} />
    </ImageItem>
  );
};

ImageGalleryItem.prototype = {
  tags: PropTypes.string,
  image: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  updateImage: PropTypes.func,
};

export { ImageGalleryItem };
