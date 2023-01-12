import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';

import { getFollowingUser } from '../apis/getFollowingUser';
import { userInfo } from '../apis/userInfo';
import FollowList from '../components/Follow/FollowingList';
import { User } from '../interfaces/user';

const DUMMY_USER_ID = '63b9844b4a1b585b777da2ea';

const Following = () => {
  const [user, setUser] = useState<User>();
  const [data, setData] = useState();
  const [followingList, setFollowingList] = useState<User[]>([]);
  const [text, setText] = useState('');

  const getUserById = async (userId: string) => {
    const data = await userInfo(userId);
    setUser(data);
  };

  useEffect(() => {
    getUserById(DUMMY_USER_ID);
  }, []);

  const followingIdList: string[] =
    user?.following?.map((following) => following.user) ?? [];

  useEffect(() => {
    (async () => {
      const followingUserList = await getFollowingUser(followingIdList);
      setFollowingList(followingUserList);
    })();
  }, [user]);

  return (
    <Container>
      {followingList ? (
        followingList.map((following) => (
          <Wrapper key={following._id}>
            <FollowList src={following.image} fullName={following.fullName} />
            <Button
              variant='outlined'
              size='small'
              sx={{ height: '30px', marginRight: '0.5rem' }}>
              Unfollow
            </Button>
          </Wrapper>
        ))
      ) : (
        <div>loading</div>
      )}
    </Container>
  );
};

export default Following;

const Wrapper = styled.div`
  display: flex;
  width: 400px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
`;
