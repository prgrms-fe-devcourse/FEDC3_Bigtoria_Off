import styled from '@emotion/styled';

import useFetchStories from '../hooks/useFetchStories';

import StoriesByYear from '../components/StoryBook/StoriesByYear';

import { Story } from '../interfaces';

import { CircularProgress } from '@mui/material';

const StoryBook = () => {
  const { storiesByYear, isLoading } = useFetchStories();

  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      {storiesByYear.map((stories) => {
        const year: string = stories[0] as string;
        stories.shift();
        const onlyStories: Story[] = stories as Story[];

        return (
          <StoriesByYear
            key={year as string}
            year={year}
            stories={onlyStories}
          />
        );
      })}
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding-left: 1rem;
`;
