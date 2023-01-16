import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowingUser } from '../apis/getFollowingUser';
import { postNotification } from '../apis/notification';
import { userInfo } from '../apis/userInfo';
import { ROUTES } from './../constants/routes';

interface List {
  _id: string;
  user: string;
  fullName?: string;
  image?: string;
  isOnline?: boolean;
}

const useGetFollow = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [followingIdList, setFollowingIdList] = useState<List[]>([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const newList: List[] = [];
      userId &&
        (await userInfo(userId).then((res) => {
          res.following.map(({ _id, user }: List) => {
            newList.push({ _id, user });
          });
        }));
      userId &&
        (await getFollowingUser(newList.map((data) => data.user)).then((res) =>
          res.map(({ fullName, image, isOnline }, index) => {
            newList[index].fullName = fullName;
            newList[index].image = image;
            newList[index].isOnline = isOnline;
          })
        ));
      setFollowingIdList(newList);
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
    if (target.dataset !== undefined) {
      try {
        setFollowLoading(true);
        const followId = target.dataset.followid;
        const userId = target.dataset.userid;
        if (target.innerText === '삭제') {
          target.innerText = '팔로우';
          if (followId && userId) {
            await removeFollow(followId);
            await postNotification('FOLLOW', followId, userId, null);
          }
        } else if (target.innerText === '팔로우') {
          target.innerText = '삭제';
          if (userId) {
            const res = await createFollow(userId); // _id , userId
            console.log(res?.data);
            const foundIndex = followingIdList.findIndex(
              (item) => item._id === followId
            );
            const newList = [...followingIdList];
            const foundItem = newList[foundIndex];
            foundItem._id = res?.data._id;
            setFollowingIdList(newList);
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
