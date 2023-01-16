import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';

import FollowingButton from '../components/Follow/FollowingButton';
import FollowList from '../components/Follow/FollowingList';
import useGetFollow from '../hooks/useGetFollow';

const Following = () => {
  const { followingIdList, loading, getUserInfo, handleClick } = useGetFollow();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
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
        followingIdList.map((following) => (
          <Wrapper key={following._id}>
            <FollowList
              src={following.image}
              fullName={following.fullName}
              isOnline={following.isOnline}
              userId={following.user}
            />
            <FollowingButton
              followId={following._id}
              userId={following.user}
              onClick={handleClick}
            />
          </Wrapper>
        ))
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
  border: 2px solid gray;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;
