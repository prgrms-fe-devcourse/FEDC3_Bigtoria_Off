import styled from '@emotion/styled';
import StoryEditForm from '../components/StoryEdit/StoryEditForm';

const StoryEdit = () => {
  return (
    <Container>
      <h1>스토리 추가</h1>
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
