import { MouseEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { createFollow } from '../apis/follow';
import { getFollowerUser } from '../apis/getFollowUser';
import { userInfo } from '../apis/userInfo';
import { FollowerList, List } from '../interfaces/followList';
import { ROUTES } from './../constants/routes';

const useGetFollower = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [followerList, setFollowerList] = useState<FollowerList[]>([]);
  const [f4f, setF4f] = useState<string[][]>([]); // 맞팔인지 확인
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      setLoading(true);
      const infoList: FollowerList[] = [];
      const f4fIdList: string[][] = [[], []];
      if (userId) {
        const res = await userInfo(userId);
        res.followers.map(({ _id, follower }: FollowerList) => {
          infoList.push({ _id, follower });
          f4fIdList[0].push(follower);
        });
        res.following.map(({ user }: List) => {
          f4fIdList[1].push(user);
        });
      }
      if (userId) {
        const res = await getFollowerUser(
          infoList.map((data) => data.follower)
        );
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
      setF4f(f4fIdList);
      setFollowerList(infoList);
    } catch (error) {
      navigate(ROUTES.NOT_FOUND);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e;
    try {
      const { userid } = currentTarget.dataset;
      if (userid) {
        await createFollow(userid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    followerList,
    loading,
    f4f,
    getUserInfo,
    handleClick,
  };
};

export default useGetFollower;
