import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
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

  async componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    const oldQuery = prevState.query;
    const prevPage = prevState.page;

    if (query !== oldQuery || page !== prevPage) {
      try {
        this.setState({ loading: true });
        const { hits, total } = await getImages(query, page);
        const totalPages = Math.round(total / 12);
        setTimeout(() => {
          this.setState(prev => ({
            images: [...prev.images, ...hits],
            loading: false,
            pagesAmount: totalPages,
            results: total,
          }));
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    }
  }

  hendelFormSubmit = query => {
    this.setState({
      query,
      images: [],
      page: 1,
    });
  };

  hendelButtonLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  hendelModalClose = () => {
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
          <Modal onClose={this.hendelModalClose} data={currentImage} />
        )}
        <Searchbar onSubmit={this.hendelFormSubmit} totalResults={results} />
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
          <LoadMoreBtn loadMore={this.hendelButtonLoadMore} />
        )}
      </AppContainer>
    );
  }
}

export { App };
