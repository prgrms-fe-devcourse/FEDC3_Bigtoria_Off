import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowUser } from '../apis/getFollowUser';
import { postNotification } from '../apis/notification';
import { userInfo } from '../apis/userInfo';
import { List } from '../interfaces/followList';
import { getChangedIndex } from '../utils/getChangedIndex';
import { ROUTES } from './../constants/routes';

const BUTTON_MESSAGE = {
  FOLLOW: '팔로우',
  DELETE: '언팔',
};

const useGetFollow = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followingList, setFollowingList] = useState<List[]>([]);
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
        const res = await getFollowUser(infoList.map((data) => data.user));
        res.map(
          ({ fullName, image, isOnline, coverImage, username }, index) => {
            infoList[index].fullName = fullName;
            infoList[index].image = image;
            infoList[index].isOnline = isOnline;
            infoList[index].coverImage = coverImage;
            infoList[index].username = username;
          }
        );
      }
      setFollowingList(infoList);
    } catch (error) {
      navigate(ROUTES.NOT_FOUND);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;

    if (currentTarget.dataset && currentTarget.firstChild) {
      try {
        setFollowLoading(true);
        const { followid, userid } = currentTarget.dataset;
        const text = currentTarget.textContent;
        if (text === BUTTON_MESSAGE.DELETE) {
          if (followid && userid) {
            await removeFollow(followid);
          }
        } else {
          if (userid) {
            const res = await createFollow(userid);
            res &&
              (await postNotification('FOLLOW', res.data._id, userid, null));
            const changedIndex = getChangedIndex(followingList, followid);
            const infoList = [...followingList];
            infoList[changedIndex]._id = res?.data._id;
            setFollowingList(infoList);
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
    followingList,
    loading,
    followLoading,
    getUserInfo,
    handleClick,
  };
};

export default useGetFollow;
