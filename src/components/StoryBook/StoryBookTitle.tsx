import styled from '@emotion/styled';

import FollowButton from './FollowButton';

interface Props {
  fullName: string;
}

const StoryBookTitle = ({ fullName }: Props) => {
  return (
    <Container>
      <Title title={`${fullName}님의 스토리북`}>{fullName}님의 스토리북</Title>
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

const Title = styled.h3`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
