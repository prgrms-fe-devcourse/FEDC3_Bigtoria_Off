import styled from '@emotion/styled';
import { Box, CircularProgress, Divider } from '@mui/material';

import StoryComment from '../components/Story/StoryComment';
import StoryInfo from '../components/Story/StoryInfo';
import useFetchStory from '../hooks/useFetchStory';

const Story = () => {
  const { story, fetchComment, isLoading } = useFetchStory();

  if (isLoading || !story.title) return <CircularProgress />;

  return (
    <Container>
      <StoryInfo story={story} />
      <Divider />
      <StoryComment comments={story.comments} fetchComment={fetchComment} />
    </Container>
  );
};

export default Story;

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
