import { Botton } from './Button.styled';
import PropTypes from 'prop-types';

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <Botton type="button" onClick={() => loadMore()}>
      LoadMore
    </Botton>
  );
};

export { LoadMoreBtn };

LoadMoreBtn.prototype = {
  loadMore: PropTypes.func.isRequired,
};
