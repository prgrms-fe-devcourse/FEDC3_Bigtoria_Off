import styled from '@emotion/styled';

import { COLORS } from '../../constants/colors';
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
              {story.isFirstInSameMonths && month}월
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
  border-radius: 1rem;
  background-color: white;

  display: flex;
  align-items: center;
`;

const Year = styled.div`
  width: 4rem;
  text-align: center;
`;

const CardsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  overflow-x: auto;
  padding: 1rem;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    height: 0.15rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.SUB};
    border-radius: 1rem;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
