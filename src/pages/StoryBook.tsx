import styled from '@emotion/styled';

import useFetchStories from '../hooks/useFetchStories';

import StoriesByYear from '../components/StoryBook/StoriesByYear';

import { CircularProgress } from '@mui/material';

const StoryBook = () => {
  const { storiesByYear, isLoading } = useFetchStories();

  if (isLoading) return <CircularProgress />;

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
