import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getFollowerUser } from '../apis/getFollowUser';
import { userInfo } from '../apis/userInfo';
import { FollowerList } from '../interfaces/followList';
import { ROUTES } from './../constants/routes';

const useGetFollower = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followerList, setFollowerList] = useState<FollowerList[]>([]);
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const infoList: FollowerList[] = [];
      if (userId) {
        const res = await userInfo(userId);
        res.followers.map(({ _id, follower }: FollowerList) => {
          infoList.push({ _id, follower });
        });
      }
      if (userId) {
        const res = await getFollowerUser(
          infoList.map((data) => data.follower)
        );
        res.map(({ fullName, image, isOnline }, index) => {
          infoList[index].fullName = fullName;
          infoList[index].image = image;
          infoList[index].isOnline = isOnline;
        });
      }
      setFollowerList(infoList);
    } catch (error) {
      navigate(ROUTES.NOT_FOUND);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    followerList,
    loading,
    getUserInfo,
  };
};

export default useGetFollower;
