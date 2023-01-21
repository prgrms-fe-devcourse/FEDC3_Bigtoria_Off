import styled from '@emotion/styled';
import { useState } from 'react';

import Empty from '../components/StoryBook/Empty';
import Loading from '../components/StoryBook/Loading';
import StoriesByYear from '../components/StoryBook/StoriesByYear';
import StoryBookTitle from '../components/StoryBook/StoryBookTitle';
import UserInfoModal from '../components/StoryBook/UserInfoModal';
import useFetchStories from '../hooks/useFetchStories';

const StoryBook = () => {
  const { storiesByYear, currentUserInfo, isLoading } = useFetchStories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Container>
      <StoriesContainer>
        {!!currentUserInfo && (
          <StoryBookTitle
            fullName={currentUserInfo.fullName}
            onClick={handleClick}
          />
        )}
        {storiesByYear.length !== 0 ? (
          storiesByYear.map(({ year, stories }) => (
            <StoriesByYear key={year} year={year} stories={stories} />
          ))
        ) : (
          <>
            {!!currentUserInfo && (
              <Empty>{currentUserInfo.fullName}님은 게으른가봐요. ㅋ</Empty>
            )}
          </>
        )}
      </StoriesContainer>
      {currentUserInfo && (
        <UserInfoModal
          userInfo={currentUserInfo}
          open={isModalOpen}
          onClose={handleClose}
        />
      )}
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
