import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import { ROUTES } from '../constants/routes';
import useFetchUser from '../hooks/useFetchUser';
import { useFetchStory } from '../hooks/useStory';

const StoryEdit = () => {
  const { user, isLoading: isUserLoading } = useFetchUser();
  const { story, isLoading: isStoryLoading } = useFetchStory();
  const { storyId } = useParams();
  const navigate = useNavigate();

  const isNew = storyId === 'new';

  useEffect(() => {
    if (isNew || isUserLoading || isStoryLoading) return;

    if (user?._id && user._id !== story.author._id) {
      alert('올바르지 않은 접근입니다.');
      navigate(ROUTES.HOME);
    }
  }, [user, story]);

  return (
    <Container>
      <h1>스토리 {isNew ? '추가' : '수정'}</h1>
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
