import styled from '@emotion/styled';

import { StoriesWithYear } from '../../interfaces/story';
import StoryCard from './StoryCard';

const StoriesByYear = ({ year, stories }: StoriesWithYear) => {
  return (
    <Container>
      <Year>{year}</Year>
      <CardsContainer>
        {stories.map((story) => {
          const { storyTitle, month } = JSON.parse(story.title);

          return (
            <CardContainer key={story._id}>
              {story.isFirstInSameMonths && month}
              <StoryCard
                title={storyTitle}
                storyId={story._id}
                image={story.image}
                lazy
              />
            </CardContainer>
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
  align-items: flex-end;
  overflow-x: auto;
  padding: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
