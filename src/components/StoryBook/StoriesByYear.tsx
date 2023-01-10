import styled from '@emotion/styled';

import StoryCard from './StoryCard';

import { Story, Title } from '../../interfaces/story';

interface Props {
  year: string;
  stories: Story[];
}

const StoriesByYear = ({ year, stories }: Props) => {
  return (
    <Container>
      <Year>{year}</Year>
      {stories.map((story) => {
        const { realTitle }: Title = JSON.parse(story.title);

        return (
          <StoryCard
            key={story._id}
            title={realTitle}
            storyId={story._id}
            image={story.image}
            lazy
          />
        );
      })}
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
