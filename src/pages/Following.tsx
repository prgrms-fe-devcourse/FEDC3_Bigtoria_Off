import styled from '@emotion/styled';
import { Button, Container } from '@mui/material';
import { MouseEvent, useEffect, useState } from 'react';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowingUser } from '../apis/getFollowingUser';
import { userInfo } from '../apis/userInfo';
import FollowList from '../components/Follow/FollowingList';
import { Follow, User } from '../interfaces/user';

const DUMMY_USER_ID = '63b9844b4a1b585b777da2ea';

const Following = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();
  const [followingList, setFollowingList] = useState<User[]>([]);

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

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    if (e.target.dataset) {
      const id = e.target.dataset.followid; //삭제버튼 누른 userId
      const following = followingList.map((follow) =>
        follow.followers?.filter((item: Follow) => item.user === id)
      );
      const followingId = following.filter((item) => item.length > 0)[0][0]._id; // 바꿔야함

      if (e.target.innerText === '삭제') {
        e.target.innerText = '팔로우';
        await removeFollow(followingId);
      } else if (e.target.innerText === '팔로우') {
        e.target.innerText = '삭제';
        await createFollow(id);
      }
    }
  };

  return (
    <Container>
      {followingList ? (
        followingList.map((following) => (
          <Wrapper key={following._id}>
            <FollowList src={following.image} fullName={following.fullName} />
            <Button
              variant='outlined'
              size='small'
              sx={{
                height: '30px',
                width: '100px',
                marginRight: '0.5rem',
                padding: '0.5rem',
                boxSizing: 'border-box',
              }}
              data-followid={following._id}
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
