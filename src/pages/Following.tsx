import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useEffect } from 'react';

import FollowingButton from '../components/Follow/FollowingButton.js';
import FollowList from '../components/Follow/FollowingList.js';
import Loading from '../components/StoryBook/Loading.js';
import useGetFollow from '../hooks/useGetFollow.js';

const Following = () => {
  const { followingIdList, loading, followLoading, getUserInfo, handleClick } =
    useGetFollow();

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loading />
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
              isLoading={followLoading}
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
  border-radius: 1rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  background-color: white;
`;
