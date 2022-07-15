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

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    const oldQuery = prevState.query;
    const prevPage = prevState.page;

    if (query !== oldQuery || page !== prevPage) {
      try {
        this.setState({ loading: true }); //Я добавлял "images: []" сюда
        const { hits, total } = await getImages(query, page);
        const totalPages = Math.round(total / 12);

        this.setState(prev => ({
          images: [...prev.images, ...hits],
          loading: false,
          pagesAmount: totalPages,
          results: total,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleFormSubmit = query => {
    // Если убрать "images: []"" тут и поствить в componentDidUpdate то при каждом запросе будет обнуляться массив картинок
    // Следовательно к пустому массиву будет распыление нового (при нажатии на 'LoadMore'), в итоге не будет длинного списка картинок.
    this.setState({
      query,
      images: [],
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

        {/* !loading && images && ... ты это имел ввиду? */}
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
