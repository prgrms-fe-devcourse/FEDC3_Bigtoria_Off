import styled from '@emotion/styled';
import { Box, CircularProgress, Divider } from '@mui/material';

import StoryComment from '../components/Story/StoryComment';
import StoryInfo from '../components/Story/StoryInfo';
import { TOKEN_KEY } from '../constants/auth';
import { useFetchStory } from '../hooks/useStory';
import { getLocalStorage } from '../utils/storage';

const Story = () => {
  const { story, fetchComment, isLoading } = useFetchStory();
  const hasToken = getLocalStorage(TOKEN_KEY) ? true : false;

  if (isLoading || !story.title) return <CircularProgress />;

  return (
    <Container>
      <StoryInfo story={story} hasToken={hasToken} />
      <Divider />
      <StoryComment
        comments={story.comments}
        fetchComment={fetchComment}
        hasToken={hasToken}
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
