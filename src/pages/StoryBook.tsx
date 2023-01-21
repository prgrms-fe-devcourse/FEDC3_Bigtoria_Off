import styled from '@emotion/styled';
import { useState } from 'react';

import Empty from '../components/StoryBook/Empty';
import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import StoryBookTitle from '../components/StoryBook/StoryBookTitle';
import UserInfoModal from '../components/StoryBook/UserInfoModal';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, fullName, isLoading } = useFetchStories();
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <StoriesContainer>
        {!!fullName && (
          <StoryBookTitle fullName={fullName} onClick={handleClick} />
        )}
        {storiesByYear.length !== 0 ? (
          storiesByYear.map(({ year, stories }) => (
            <StoriesByYear key={year} year={year} stories={stories} />
          ))
        ) : (
          <>{!!fullName && <Empty>{fullName}님은 게으른가봐요. ㅋ</Empty>}</>
        )}
      </StoriesContainer>
      <UserInfoModal open={isOpen} onClose={handleClose} />
    </Container>
  );
};

export default StoryBook;

const Container = styled.main`
  padding: 0 1rem;
`;

const StoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
