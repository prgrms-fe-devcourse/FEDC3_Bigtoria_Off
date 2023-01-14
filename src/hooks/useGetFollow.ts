import { MouseEvent, useState } from 'react';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowingUser } from '../apis/getFollowingUser';
import { userInfo } from '../apis/userInfo';

const DUMMY_USER_ID = '63b9844b4a1b585b777da2ea';
const useGetFollow = () => {
  const [loading, setLoading] = useState(false);
  const [followingIdList, setFollowingIdList] = useState([]);

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const newList = [];
      await userInfo(DUMMY_USER_ID).then((res) => {
        res.following.map(({ _id, user }) => {
          newList.push({ _id: _id, user: user });
        });
      });
      await getFollowingUser(newList.map((data) => data.user)).then((res) =>
        res.map(({ fullName, image }, index) => {
          newList[index].fullName = fullName;
          newList[index].image = image;
        })
      );
      setFollowingIdList(newList);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    if (e.target.dataset !== undefined) {
      const followId = e.target.dataset.followid;
      const userId = e.target.dataset.userid;
      if (e.target.innerText === '삭제') {
        e.target.innerText = '팔로우';
        await removeFollow(followId);
      } else if (e.target.innerText === '팔로우') {
        e.target.innerText = '삭제';
        await createFollow(userId);
      }
    }
  };

  return {
    followingIdList,
    loading,
    getUserInfo,
    handleClick,
  };
};

export default useGetFollow;
