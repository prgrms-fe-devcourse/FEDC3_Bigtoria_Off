import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import useFetchStory from '../hooks/useFetchStory';

const StoryEdit = () => {
  const { storyId } = useParams();
  let title;
  if (!storyId) {
    title = '스토리 추가';
  } else {
    const { story, isLoading } = useFetchStory();
    if (isLoading || !story.title) return <CircularProgress />;
    // TODO: 스토리 정보 Form으로 전달(hook 매개변수로 initialState 전달)
  }

  return (
    <Container>
      <h1>{title}</h1>
      <StoryEditForm />
    </Container>
  );
};

export default StoryEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
