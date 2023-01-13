import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import { useFetchStory } from '../hooks/useStory';

const StoryEdit = () => {
  const { story, isLoading } = useFetchStory();
  if (isLoading) return <CircularProgress />;

  return (
    <Container>
      <h1>스토리 {story._id ? '수정' : '추가'}</h1>
      <StoryEditForm story={story} />
    </Container>
  );
};

export default StoryEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
