import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useEffect } from 'react';

import FollowEmpty from '../components/Follow/FollowEmpty';
import FollowerButton from '../components/Follow/FollowerButton';
import FollowHeader from '../components/Follow/FollowHeader';
import FollowingList from '../components/Follow/FollowingList';
import Loading from '../components/StoryBook/Loading';
import useGetFollower from '../hooks/useGetFollower';

const Follower = () => {
  const { followerList, loading, f4f, getUserInfo, handleClick } =
    useGetFollower();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container sx={{ marginTop: '1rem' }}>
      <FollowHeader />
      {loading ? (
        <Loading />
      ) : followerList.length > 0 ? (
        followerList.map(
          ({
            _id,
            followingId,
            image,
            fullName,
            isOnline,
            follower,
            coverImage,
            username,
          }) => (
            <Wrapper key={_id}>
              <FollowingList
                userInfo={{
                  image,
                  fullName,
                  isOnline,
                  user: follower,
                  coverImage,
                  username,
                }}
              />
              <FollowerButton
                followId={followingId}
                userId={follower}
                f4f={f4f}
                onClick={handleClick}
              />
            </Wrapper>
          )
        )
      ) : (
        <FollowEmpty type='follower' />
      )}
    </Container>
  );
};

export default Follower;

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
