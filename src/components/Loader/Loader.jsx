import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Container, Spinner } from './Loader.styled';

const Loader = () => {
  return (
    <Container>
      <Spinner height="80" width="100" color="#303f9f" ariaLabel="loading" />
    </Container>
  );
};

export { Loader };
