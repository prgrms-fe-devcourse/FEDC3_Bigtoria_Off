import styled from '@emotion/styled';
import { CircularProgress, Container } from '@mui/material';
import { useEffect } from 'react';

import FollowHeader from '../components/Follow/FollowHeader';
import FollowingButton from '../components/Follow/FollowingButton';
import FollowingList from '../components/Follow/FollowingList';
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
