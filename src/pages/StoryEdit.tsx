import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';
import { useFetchStory } from '../hooks/useStory';

const StoryEdit = () => {
  const { story } = useFetchStory();
  const { storyId } = useParams();

  const isNew = storyId === 'new';

  return (
    <Container>
      <h1>스토리 {isNew ? '추가' : '수정'}</h1>
      <StoryEditForm story={story} isNew={isNew} />
    </Container>
  );
};

export default StoryEdit;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;
