import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useEffect } from 'react';

import FollowEmpty from '../components/Follow/FollowEmpty';
import FollowHeader from '../components/Follow/FollowHeader';
import FollowingButton from '../components/Follow/FollowingButton';
import FollowingList from '../components/Follow/FollowingList';
import Loading from '../components/StoryBook/Loading';
import useGetFollow from '../hooks/useGetFollow';

const Following = () => {
  const { followingList, loading, followLoading, getUserInfo, handleClick } =
    useGetFollow();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <FollowHeader />
      {loading ? (
        <Loading />
      ) : followingList.length > 0 ? (
        followingList.map(
          ({ _id, image, fullName, isOnline, user, coverImage, username }) => (
            <Wrapper key={_id}>
              <FollowingList
                userInfo={{
                  image,
                  fullName,
                  isOnline,
                  user,
                  coverImage,
                  username,
                }}
              />
              <FollowingButton
                followId={_id}
                userId={user}
                isLoading={followLoading}
                onClick={handleClick}
              />
            </Wrapper>
          )
        )
      ) : (
        <FollowEmpty type='following' />
      )}
    </Container>
  );
};

export default Following;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  background-color: white;
`;
