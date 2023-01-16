import styled from '@emotion/styled';

import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import StoryBookTitle from '../components/StoryBook/StoryBookTitle';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, fullName, isLoading } = useFetchStories();

  if (isLoading) return <Loading />;

  return (
    <Container>
      <StoriesContainer>
        {!!fullName && <StoryBookTitle fullName={fullName} />}
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

const StoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
