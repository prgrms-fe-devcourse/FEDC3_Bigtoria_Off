import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowingUser } from '../apis/getFollowingUser';
import { postNotification } from '../apis/notification';
import { userInfo } from '../apis/userInfo';
import { List } from '../interfaces/followList';
import { getChangedIndex } from '../utils/getChangedIndex';
import { ROUTES } from './../constants/routes';

const BUTTON_MESSAGE = {
  FOLLOW: '팔로우',
  DELETE: '삭제',
};

const useGetFollow = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followingIdList, setFollowingIdList] = useState<List[]>([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const infoList: List[] = [];
      if (userId) {
        const res = await userInfo(userId);
        res.following.map(({ _id, user }: List) => {
          infoList.push({ _id, user });
        });
      }
      if (userId) {
        const res = await getFollowingUser(infoList.map((data) => data.user));
        res.map(({ fullName, image, isOnline }, index) => {
          infoList[index].fullName = fullName;
          infoList[index].image = image;
          infoList[index].isOnline = isOnline;
        });
      }
      setFollowingIdList(infoList);
    } catch (error) {
      navigate(ROUTES.NOT_FOUND);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const { target } = e;
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }

    if (target.dataset) {
      try {
        setFollowLoading(true);
        const { followid, userid } = target.dataset;
        if (target.innerText === BUTTON_MESSAGE.DELETE) {
          target.innerText = BUTTON_MESSAGE.FOLLOW;
          if (followid && userid) {
            await removeFollow(followid);
            await postNotification('FOLLOW', followid, userid, null);
          }
        } else {
          target.innerText = BUTTON_MESSAGE.DELETE;
          if (userid) {
            const res = await createFollow(userid);
            const changedIndex = getChangedIndex(followingIdList, followid);
            const infoList = [...followingIdList];
            infoList[changedIndex]._id = res?.data._id;
            setFollowingIdList(infoList);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFollowLoading(false);
      }
    }
  };

  return {
    followingIdList,
    loading,
    followLoading,
    getUserInfo,
    handleClick,
  };
};

export default useGetFollow;
