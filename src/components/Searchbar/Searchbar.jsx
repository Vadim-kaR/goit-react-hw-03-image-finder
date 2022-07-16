import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import { ImSearch } from 'react-icons/im';
import {
  SearchbarHeader,
  SearchBtn,
  Input,
  SearchForm,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const handleFormSubmit = ({ name }, { resetForm }) => {
    if (name.trim() === '') {
      toast.error('Enter a name in the search bar');
      return;
    }
    onSubmit(name);
    resetForm();
  };

  return (
    <SearchbarHeader>
      <Formik initialValues={{ name: '' }} onSubmit={handleFormSubmit}>
        <SearchForm>
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
};

export { Searchbar };

Searchbar.prototype = {
  onSubmit: PropTypes.func,
};
