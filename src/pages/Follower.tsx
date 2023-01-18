import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';

import FollowerButton from '../components/Follow/FollowerButton';
import FollowHeader from '../components/Follow/FollowHeader';
import FollowingList from '../components/Follow/FollowingList';
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
        <CircularProgress
          size={60}
          sx={{
            color: 'royalblue',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-30px',
            marginLeft: '-30px',
          }}
        />
      ) : (
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
  border: 2px solid gray;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;
