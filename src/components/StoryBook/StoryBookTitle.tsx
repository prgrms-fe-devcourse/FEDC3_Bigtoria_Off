import styled from '@emotion/styled';

import FollowButton from './FollowButton';

interface Props {
  fullName: string;
  onClick: () => void;
}

const StoryBookTitle = ({ fullName, onClick }: Props) => {
  return (
    <Container>
      <Title title={`${fullName}님의 스토리북`} onClick={onClick}>
        {fullName}님의 스토리북
      </Title>
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

const Title = styled.h1`
  font-size: 1.2rem;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
