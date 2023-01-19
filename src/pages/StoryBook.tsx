import styled from '@emotion/styled';

import Empty from '../components/StoryBook/Empty';
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
        {storiesByYear.length !== 0 ? (
          storiesByYear.map(({ year, stories }, i) => (
            <StoriesByYear key={stories[i]._id} year={year} stories={stories} />
          ))
        ) : (
          <>{!!fullName && <Empty>{fullName}님은 게으른가봐요. ㅋ</Empty>}</>
        )}
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
