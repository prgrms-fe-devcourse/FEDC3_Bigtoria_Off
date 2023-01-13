import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import useFetchUser from '../hooks/useFetchUser';
import { useFetchStory } from '../hooks/useStory';

const StoryEdit = () => {
  const { story, isLoading } = useFetchStory();
  const { user } = useFetchUser();
  const navigate = useNavigate();
  if (user._id !== story.author._id) {
    alert('올바르지 않은 접근입니다.');
    navigate('/');
    return;
  }

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
