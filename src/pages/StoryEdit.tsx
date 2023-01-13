import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import useFetchUser from '../hooks/useFetchUser';
import { useFetchStory } from '../hooks/useStory';

const StoryEdit = () => {
  const { user, isLoading: isUserLoading } = useFetchUser();
  const { story, isNew, isLoading: isStoryLoading } = useFetchStory();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNew || isUserLoading) return;

    if (user._id && user._id !== story.author._id) {
      alert('올바르지 않은 접근입니다.');
      navigate('/');
    }
  }, [user]);

  if (!user._id || isStoryLoading) return <CircularProgress />;

  return (
    <Container>
      <h1>스토리 {!isNew || story._id ? '수정' : '추가'}</h1>
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
