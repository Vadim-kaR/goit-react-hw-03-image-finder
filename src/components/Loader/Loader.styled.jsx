import styled from 'styled-components';
import { ThreeDots } from 'react-loader-spinner';

export const Container = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
`;

export const Spinner = styled(ThreeDots)`
  margin-left: auto;
  margin-right: auto;
`;
