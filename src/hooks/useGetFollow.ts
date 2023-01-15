import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow, removeFollow } from '../apis/follow';
import { getFollowingUser } from '../apis/getFollowingUser';
import { userInfo } from '../apis/userInfo';
import { ROUTES } from './../constants/routes';

interface List {
  _id: string;
  user: string;
  fullName?: string;
  image?: string;
}

const useGetFollow = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followingIdList, setFollowingIdList] = useState<List[]>([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const newList: List[] = [];
      userId &&
        (await userInfo(userId).then((res) => {
          res.following.map(({ _id, user }: List) => {
            newList.push({ _id: _id, user: user });
          });
        }));
      userId &&
        (await getFollowingUser(newList.map((data) => data.user)).then((res) =>
          res.map(({ fullName, image }, index) => {
            newList[index].fullName = fullName;
            newList[index].image = image;
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
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }

    if (e.target.dataset !== undefined) {
      const followId = e.target.dataset.followid;
      const userId = e.target.dataset.userid;
      if (e.target.innerText === '삭제') {
        e.target.innerText = '팔로우';
        followId && (await removeFollow(followId));
      } else if (e.target.innerText === '팔로우') {
        e.target.innerText = '삭제';
        userId && (await createFollow(userId));
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
