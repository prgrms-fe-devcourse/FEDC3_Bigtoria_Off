import styled from '@emotion/styled';
import { Box, Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import StoryComment from '../components/Story/StoryComment';
import StoryInfo from '../components/Story/StoryInfo';
import { useFetchStory } from '../hooks/useStory';

const Story = () => {
  const { story, fetchComment } = useFetchStory();
  const { state } = useLocation();
  const [detailStory, setDetailStory] = useState(state);

  useEffect(() => {
    if (story.createdAt !== '') {
      setDetailStory(story);
    }
  }, [story]);

  return (
    <Container>
      <StoryInfo story={detailStory} />
      <Divider />
      <StoryComment
        storyAuthorId={detailStory.author._id}
        comments={detailStory.comments}
        fetchComment={fetchComment}
      />
    </Container>
  );
};

export default Story;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
