import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from 'components/AppContainer/AppContainer.styled';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { getImages } from 'services/images-api';
import { Loader } from 'components/Loader/Loader';
import { LoadMoreBtn } from './components/Button/Button';
import { Modal } from 'components/Modal/Modal';

class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    pagesAmount: 0,
    currentImage: null,
    results: null,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    const oldQuery = prevState.query;
    const prevPage = prevState.page;

    if (query !== oldQuery || page !== prevPage) {
      this.setState({ loading: true });
      const { hits, total } = await getImages(query, page, this.handleError);
      const totalPages = Math.round(total / 12);

      this.setState(({ images }) => ({
        images: page > 1 ? [...images, ...hits] : hits,
        loading: false,
        pagesAmount: totalPages,
        results: total,
      }));

      if (page === 1) {
        toast.success(`we found: ${total} results`);
      }
    }
  }

  handleError = error => {
    toast.error(`${error.message}`);
    this.setState({ loading: false });
  };

  handleFormSubmit = query => {
    this.setState({
      query,
      page: 1,
    });
  };
  handleButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModalClose = () => {
    this.setState({ currentImage: null });
  };

  updateCurrentImage = shape => {
    this.setState({ currentImage: shape });
  };

  render() {
    const { query, images, loading, page, pagesAmount, currentImage, results } =
      this.state;
    return (
      <AppContainer>
        {currentImage && (
          <Modal onClose={this.handleModalClose} data={currentImage} />
        )}
        <Searchbar onSubmit={this.handleFormSubmit} totalResults={results} />
        <ToastContainer autoClose={3000} />

        {images && (
          <ImageGallery
            query={query}
            data={images}
            updateImage={this.updateCurrentImage}
          />
        )}
        {loading && <Loader />}
        {page <= pagesAmount && (
          <LoadMoreBtn loadMore={this.handleButtonLoadMore} />
        )}
      </AppContainer>
    );
  }
}

export { App };
