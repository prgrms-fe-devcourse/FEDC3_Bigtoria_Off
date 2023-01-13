import styled from '@emotion/styled';

import { StoriesWithYear, Title } from '../../interfaces/story';
import StoryCard from './StoryCard';

const StoriesByYear = ({ year, stories }: StoriesWithYear) => {
  return (
    <Container>
      <Year>{year}</Year>
      <CardsContainer>
        {stories.map((story) => {
          const { storyTitle }: Title = JSON.parse(story.title);

          return (
            <StoryCard
              key={story._id}
              title={storyTitle}
              storyId={story._id}
              image={story.image}
              lazy
            />
          );
        })}
      </CardsContainer>
    </Container>
  );
};

export default StoriesByYear;

const Container = styled.div`
  margin-bottom: 1rem;

  display: flex;
  align-items: center;
`;

const Year = styled.div`
  width: 4rem;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  overflow-x: auto;
  padding: 1rem;

  > div {
    flex: 0 0 auto;
  }
`;
