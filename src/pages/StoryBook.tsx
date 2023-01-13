import styled from '@emotion/styled';

import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, isLoading } = useFetchStories();

  if (isLoading) return <Loading />;

  return (
    <Container>
      {storiesByYear.map(({ year, stories }) => (
        <StoriesByYear key={year} year={year} stories={stories} />
      ))}
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding-left: 1rem;
`;
