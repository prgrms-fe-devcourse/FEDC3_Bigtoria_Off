import styled from '@emotion/styled';

import FollowButton from './FollowButton';

interface Props {
  fullName: string;
}

const StoryBookTitle = ({ fullName }: Props) => {
  return (
    <Container>
      <h3>{fullName}님의 스토리북</h3>
      <FollowButton />
    </Container>
  );
};

export default StoryBookTitle;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
