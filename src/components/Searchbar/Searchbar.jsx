import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Component } from 'react';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchBtn,
  Input,
  SearchForm,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = () => {
    const { onSubmit } = this.props;
    const { query } = this.state;

    if (this.state.query.trim() === '') {
      toast.error('Enter a name in the search bar');
      return;
    }
    onSubmit(query);
    this.setState({ query: '' });
    //Убрал setTimeout в итоге первый тост null, второй номально.
    toast.success(`we found: ${this.props.totalResults} results`);
  };

  handleFormChange = e => {
    const newQuery = e.currentTarget.name.value;
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <SearchbarHeader>
        <Formik initialValues={{ name: '' }} onSubmit={this.handleFormSubmit}>
          <SearchForm onChange={this.handleFormChange}>
            <SearchBtn type="submit">
              <ImSearch size={24} />
            </SearchBtn>
            <Input
              type="text"
              name="name"
              value={this.state.query}
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </SearchForm>
        </Formik>
      </SearchbarHeader>
    );
  }
}

Searchbar.propTypes = {
  totalResults: PropTypes.number,
  onSubmit: PropTypes.func,
  query: PropTypes.string,
};

export { Searchbar };
