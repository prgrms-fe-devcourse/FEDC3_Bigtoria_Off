import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

import StoriesByYear from '../components/StoryBook/StoriesByYear';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, isLoading } = useFetchStories();

  if (!isLoading)
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 50%)',
        }}
      />
    );

  return (
    <Container>
      {storiesByYear.map(({ year, stories }) => {
        return <StoriesByYear key={year} year={year} stories={stories} />;
      })}
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding-left: 1rem;
`;
