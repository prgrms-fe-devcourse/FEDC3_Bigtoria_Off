import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import StoryEditForm from '../components/StoryEdit/StoryEditForm';

const StoryEdit = () => {
  const { storyId } = useParams();

  return (
    <Container>
      <h1>스토리 {storyId === 'new' ? '추가' : '수정'}</h1>
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
