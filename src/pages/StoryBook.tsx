import styled from '@emotion/styled';

import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, fullName, isLoading } = useFetchStories();

  return (
    <Container>
      {isLoading && <Loading />}
      <StoriesContainer>
        <div>{fullName}</div>
        {storiesByYear.map(({ year, stories }) => (
          <StoriesByYear key={year} year={year} stories={stories} />
        ))}
      </StoriesContainer>
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding: 0 1rem;
`;

const StoriesContainer = styled.div``;
