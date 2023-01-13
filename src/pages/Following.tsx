import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { getFollowingUser } from '../apis/getFollowingUser';
import { removeFollow } from '../apis/removeFollow';
import { userInfo } from '../apis/userInfo';
import FollowList from '../components/Follow/FollowingList';
import { User } from '../interfaces/user';

const DUMMY_USER_ID = '63b9844b4a1b585b777da2ea';

const Following = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [followingList, setFollowingList] = useState<User[]>([]);
  const followingId = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await userInfo(DUMMY_USER_ID);
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [DUMMY_USER_ID]);

  // 팔로잉 유저 id
  const followingIdList: string[] =
    user?.following?.map((following) => following.user) ?? [];

  //id로 유저 정보 가져오기
  useEffect(() => {
    (async () => {
      try {
        const followingUserList = await getFollowingUser(followingIdList);
        setFollowingList(followingUserList);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const handleClick = async () => {
    const id = followingId.current?.dataset.followid;
    const removeId = followingList.map((follow) =>
      follow.followers?.filter((item) => item.user === id)
    );
    const followId = removeId.filter((item) => item.length !== 0)[0][0]._id;
    await removeFollow(followId);
  };

  return (
    <Container>
      {console.log(followingList)}
      {followingList ? (
        followingList.map((following) => (
          <Wrapper
            key={following._id}
            data-followid={following._id}
            ref={followingId}>
            <FollowList src={following.image} fullName={following.fullName} />
            <Button
              variant='outlined'
              size='small'
              sx={{ height: '30px', marginRight: '0.5rem', padding: '1rem' }}
              onClick={handleClick}>
              삭제
            </Button>
          </Wrapper>
        ))
      ) : (
        <div>asd</div>
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
