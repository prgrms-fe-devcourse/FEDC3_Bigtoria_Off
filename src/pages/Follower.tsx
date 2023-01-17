import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';

import FollowHeader from '../components/Follow/FollowHeader';
import FollowList from '../components/Follow/FollowingList';
import useGetFollower from '../hooks/useGetFollower';

const Follower = () => {
  const { followerList, loading, getUserInfo } = useGetFollower();

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
        followerList.map((follower) => (
          <Wrapper key={follower._id}>
            <FollowList
              src={follower.image}
              fullName={follower.fullName}
              isOnline={follower.isOnline}
              userId={follower.follower}
            />
          </Wrapper>
        ))
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
