import styled from '@emotion/styled';

import { COLORS } from '../../constants/colors';
import useDisplayModeContext from '../../contexts/DisplayModeContext';
import { StoriesWithYear } from '../../interfaces/story';
import StoryCard from './StoryCard';

const StoriesByYear = ({ year, stories }: StoriesWithYear) => {
  const { displayMode } = useDisplayModeContext();

  return (
    <Container>
      <Year>{year}</Year>
      <CardsContainer displayMode={displayMode}>
        {stories.map((story) => {
          const { storyTitle, month } = JSON.parse(story.title);

          return (
            <CardContainer key={story._id}>
              {story.isFirstInSameMonths && `${month}월`}
              <StoryCard
                story={story}
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
  margin-top: 0.3rem;
  margin-bottom: 1rem;
  border-radius: 1rem;
  background-color: ${COLORS.SUB};
  box-shadow: 2px 2px 3px 2px ${COLORS.HEADER_BORDER};

  display: flex;
  align-items: center;
`;

const Year = styled.div`
  width: 3.25rem;
  height: 100%;
  text-align: center;
  color: white;
`;

const CardsContainer = styled.div<{ displayMode: string }>`
  flex: 1;
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  overflow-x: auto;
  padding: 1rem;
  background-color: ${({ displayMode }) =>
    displayMode === 'dark' ? 'black' : 'white'};
  transition: background-color 0.2s ease-out;

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
