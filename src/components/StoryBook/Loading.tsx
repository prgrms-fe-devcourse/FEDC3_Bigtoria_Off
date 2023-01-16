import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
