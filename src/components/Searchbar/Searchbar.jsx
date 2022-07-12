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

  hendelFormSubmit = () => {
    const { onSubmit } = this.props;
    const { query } = this.state;

    if (this.state.query.trim() === '') {
      toast.error('Enter a name in the search bar');
      return;
    }
    onSubmit(query);
    setTimeout(() => {
      toast.success(`we found: ${this.props.totalResults} results`);
    }, 2000);
  };

  hendelFormChange = e => {
    const newQuery = e.currentTarget.name.value;
    this.setState({ query: newQuery });
  };

  render() {
    return (
      <SearchbarHeader>
        <Formik initialValues={{ name: '' }} onSubmit={this.hendelFormSubmit}>
          <SearchForm onChange={this.hendelFormChange}>
            <SearchBtn type="submit">
              <ImSearch size={24} />
            </SearchBtn>
            <Input
              type="text"
              name="name"
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
};

export { Searchbar };
