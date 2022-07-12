import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageList } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ data, updateImage }) => {
  return (
    <ImageList>
      {data.map(({ id, tags, webformatURL, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          tags={tags}
          image={webformatURL}
          largeImg={largeImageURL}
          updateImage={updateImage}
        />
      ))}
    </ImageList>
  );
};

export { ImageGallery };

ImageGallery.prototype = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tags: PropTypes.string,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  updateImage: PropTypes.func.isRequired,
};
